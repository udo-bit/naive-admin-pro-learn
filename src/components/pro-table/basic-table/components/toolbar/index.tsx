import Setting from './setting'
import Reload from './reload'
import { useProTableState } from '~/components/pro-table/context'

const toolbar = defineComponent({
  name: 'Toolbar',
  setup(_, { slots }) {
    const { options } = useProTableState()
    return () => {
      const renderToolbar = () => {
        if (options.value === false)
          return null

        return (
          <div class="flex gap-4">
            {options.value?.reload && <Reload />}
            {options.value?.setting && <Setting />}
          </div>
        )
      }
      const renderHeaderTitle = () => {
        if (slots.headerTitle)
          return slots.headerTitle()

        return '高级表格'
      }
      return (
        <div class="flex justify-between pb-16px">
          <div class="font-500 text-16px">{renderHeaderTitle()}</div>
          <div class="flex items-center gap-4">
            {slots.toolbarRender?.()}
            {renderToolbar()}
          </div>
        </div>
      )
    }
  },
})

export default toolbar
