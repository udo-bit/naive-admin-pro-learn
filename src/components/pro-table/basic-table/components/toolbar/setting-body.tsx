import { NTree } from 'naive-ui'
import { useProTableState } from '~/components/pro-table/context'

const settingBody = defineComponent({
  name: 'SettingBody',
  setup() {
    const state = useProTableState()
    return () => {
      const treeProps = {
        'onUpdate:checkedKeys': state?.settingColumn?.handleCheckedKeys,
      }
      return (
        <div class="py-6px">
          <NTree
            {...treeProps}
            data={state.settingColumn?.treeData?.value}
            checkedKeys={state.settingColumn?.checkedKeys?.value}
            checkable
            selectable={false}
          />
        </div>
      )
    }
  },
})

export default settingBody
