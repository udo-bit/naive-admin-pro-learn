import type { QueryFormProps } from '~/components/pro-table/query-form/typing'

const useCols = (props: QueryFormProps) => {
  // TODO
  const model = reactive<Record<string, any>>({})
  const domRef = ref<HTMLElement>()
  const { width } = useElementSize(domRef)
  const collapsed = ref(false)
  const cols = computed(() => {
    if (width.value < 513)
      return 1
    else if (width.value < 1062)
      return 2
    else if (width.value < 1352)
      return 3

    return 4
  })
  const items = computed(() => {
    return props?.columns?.filter((item) => {
      return item.hideInSearch !== true
    })
  })
  const itemCols = computed(() => {
    if (!collapsed.value) {
      if (cols.value <= 1)
        return items.value.slice(0, 1)

      return items.value.slice(0, cols.value - 1)
    }
    return items.value
  })

  const restCol = computed(() => {
    if (cols.value <= 1)
      return 1

    const rest = itemCols.value.length % cols.value
    if (rest === 0)
      return cols.value

    return cols.value - rest
  })
  const toggleCollapsed = () => {
    collapsed.value = !collapsed.value
  }

  const handleSearch = () => {
    props?.onSearch?.(model)
  }

  const handleReset = () => {
    // 就需要先处理一下数据
    for (const modelKey in model)
      model[modelKey] = null

    props?.onReset?.(model)
  }

  return {
    items,
    itemCols,
    model,
    cols,
    domRef,
    restCol,
    collapsed,
    toggleCollapsed,
    handleSearch,
    handleReset,
  }
}

export default useCols
