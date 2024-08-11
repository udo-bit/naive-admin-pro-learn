import type { PaginationProps } from 'naive-ui'
import type { ProTableProps } from '~/components/pro-table/typing'

const useRequestState = (props: ProTableProps) => {
  const remote = computed(() => {
    if (props.request)
      return true
    return props.remote
  })
  const data = ref<Record<string, any>[]>([])
  const loading = ref(false)
  let storeParams: Record<string, any> | undefined = {}
  const pagination = ref<PaginationProps>({
    page: 1,
    pageSize: 10,
  })
  const handleRequest = async (params?: Record<string, any>) => {
    if (!props.request)
      return
    try {
      loading.value = true
      const { data: dataSource, total = 0 } = await props.request({
        page: pagination.value.page ?? 1,
        pageSize: pagination.value.pageSize ?? 10,
        ...props.params,
        ...storeParams,
        ...params,
      })
      pagination.value.pageCount = total
      data.value = dataSource
    }
    finally {
      loading.value = false
    }
  }
  onMounted(() => {
    if (props.manualRequest)
      handleRequest().then(() => {})
  })

  pagination.value['onUpdate:page'] = (page: number) => {
    handleRequest({ page }).then(() => {
      pagination.value.page = page
    })
  }

  pagination.value['onUpdate:pageSize'] = (pageSize: number) => {
    handleRequest({ pageSize }).then(() => {
      pagination.value.pageSize = pageSize
    })
  }

  const formatPagination = () => {
    if (props.request) {
      return {
        ...props.pagination,
        ...(pagination.value as PaginationProps),
      }
    }
    return props?.pagination
  }

  const requestProps = reactive({
    remote,
    data: computed(() => {
      if (props.request)
        return data.value
      return props.data
    }),
    loading: computed(() => {
      if (props.request)
        return loading.value
      return props.loading
    }),
  })

  const querySearch = async (params?: Record<string, any>) => {
    const queryParams = {
      ...params,
      page: 1,
    }
    try {
      storeParams = {}
      await handleRequest(queryParams)
      storeParams = params
      pagination.value.page = 1
    }
    catch (e) {
      // 异常处理
    }
  }

  return {
    requestProps,
    handleRequest,
    formatPagination,
    querySearch,
  }
}

export { useRequestState }
