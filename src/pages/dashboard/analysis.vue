<script lang="tsx" setup>
import { systemMenuApi } from '~/api/menu'
import ProTable from '~/components/pro-table'

const { t } = useI18n()

const columns = ref<any[]>([
  {
    title: '标题',
    key: 'title',
    width: 200,
    hideInSearch: true,
    render(row: any) {
      return t(row.title)
    },
    fixed: 'left',
  },
  {
    title: '名称',
    key: 'name',
    minWidth: 200,
    valueType: 'input',
  },
  {
    title: '路径',
    key: 'path',
    width: 200,
    valueType: 'input',
  },
  {
    title: '组件',
    key: 'component',
    width: 200,
    valueType: 'input',
  },
  {
    title: '图标',
    key: 'icon',
    hideInSearch: true,
    width: 200,
  },
  {
    title: '重定向',
    key: 'redirect',
    width: 200,
    valueType: 'input',
  },
  {
    title: '保活状态',
    key: 'keepAlive',
    hideInSearch: true,
    width: 100,
    // render(row: any, index: number) {
    //   return (
    //     <NSwitch
    //       value={row.keepAlive}
    //       onUpdateValue={v => (data.value[index].keepAlive = v)}
    //     />
    //   )
    // }
  },
  {
    title: '启用状态',
    key: 'status',
    width: 100,
    valueType: 'select',
    valueEnum: {
      1: { value: 1, label: '启用' },
      2: { value: 2, label: '禁用' },
    },
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render() {
      return '1'
    },
  },
])
const handleRequest = async (params?: any): Promise<any> => {
  const res = await systemMenuApi(params)
  console.log(res)
  return {
    ...res.data,
  }
}
</script>

<template>
  <div>
    <ProTable
      :columns="columns"
      :request="handleRequest"
      :scroll-x="1800"
      :pagination="{
        showSizePicker: true,
        pageSizes: [10, 20, 50, 100],
      }"
    >
      <template #headerTitle>
        我是表格标题
      </template>
      <template #toolbarRender>
        <n-button
          type="primary"
          size="small"
        >
          新增
        </n-button>
      </template>
    </ProTable>
  </div>
</template>

<style scoped></style>
