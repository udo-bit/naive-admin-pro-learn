import { NButton, NCheckbox } from 'naive-ui'
import { useProTableState } from '~/components/pro-table/context'

const settingHeader = defineComponent({
  name: 'SettingHeader',
  setup() {
    const state = useProTableState()
    return () => {
      const checkboxProps = {
        'onUpdate:checked': state?.settingColumn?.handleCheckAll,
      }
      return (
        <div class="flex justify-between w-240px py-6px px-24px">
          <div>
            <NCheckbox
              {...checkboxProps}
              checked={state.settingColumn?.isAllChecked?.value}
              indeterminate={state.settingColumn?.indeterminate?.value}
            />
            <span class="ml-6px">列展示</span>
          </div>
          <NButton
            onClick={state?.settingColumn?.init}
            text
            type="primary"
          >
            重置
          </NButton>
        </div>
      )
    }
  },
})

export default settingHeader
