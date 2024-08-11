import { NDataTable, dataTableProps } from 'naive-ui'
import Toolbar from './components/toolbar'
import { useProTableState } from '~/components/pro-table/context'

const basicTable = defineComponent({
  name: 'BasicTable',
  props: {
    ...dataTableProps,
  },
  setup(props, { slots }) {
    const prefixCls = 'pro-table-basic-table'
    const state = useProTableState()
    return () => {
      const tableSlots = {
        empty: slots.empty,
        loading: slots.loading,
      }
      const toolbarSlots = {
        headerTitle: slots.headerTitle,
        toolbarRender: slots.toolbarRender,
      }
      return (
        <div class={prefixCls}>
          <Toolbar v-slots={toolbarSlots} />
          <NDataTable
            {...props}
            columns={state.settingColumn?.cols.value}
            v-slots={tableSlots}
          >
          </NDataTable>
        </div>
      )
    }
  },
})

export default basicTable
