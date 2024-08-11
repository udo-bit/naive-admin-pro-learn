import { ReloadOutlined } from '@vicons/antd'
import { NButton, NIcon, NTooltip } from 'naive-ui'
import { useProTableState } from '~/components/pro-table/context'

const reload = defineComponent({
  name: 'Reload',
  setup() {
    const state = useProTableState()
    return () => {
      const tooltipSlots = {
        trigger: () => (
          <NButton
            text
            onClick={() => state?.requestState?.handleRequest()}
          >
            <NIcon
              size={18}
              class="cursor-pointer"
            >
              <ReloadOutlined />
            </NIcon>
          </NButton>
        ),
      }

      return (
        <NTooltip v-slots={tooltipSlots}>
          <span>刷新</span>
        </NTooltip>
      )
    }
  },
})

export default reload
