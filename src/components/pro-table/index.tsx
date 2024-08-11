import { NEl } from 'naive-ui'
import { proTableProps } from './typing'
import QueryForm from './query-form'
import BasicTable from './basic-table'
import { useProTableProvider } from '~/components/pro-table/context'
import './styles/index.less'

const proTable = defineComponent({
  name: 'ProTable',
  props: {
    ...proTableProps,
  },
  setup(props, { slots }) {
    const state = useProTableProvider(props)
    return () => {
      const basicTableSlots = {
        empty: slots.empty,
        loading: slots.loading,
        headerTitle: slots.headerTitle,
        toolbarRender: slots.toolbarRender,
      }
      const pagination = state?.requestState?.formatPagination() ?? props?.pagination
      return (
        <NEl
          tag="div"
          class="pro-table"
        >
          <QueryForm
            loading={state?.requestState?.requestProps?.loading}
            columns={props.columns}
            onReset={state?.requestState?.querySearch}
            onSearch={state?.requestState?.querySearch}
          />
          <BasicTable
            {...props}
            {...state?.requestState?.requestProps}
            pagination={pagination}
            v-slots={basicTableSlots}
          />
        </NEl>
      )
    }
  },
})

export default proTable
