import type { PropType } from '@vue/runtime-core'
import type { SelectOption } from 'naive-ui'
import { NBadge, NSelect, NSpace, selectProps } from 'naive-ui'
import { proFormField } from '~/components/pro-table/query-form/components/typing'
import type { ProTableValueEnum } from '~/components/pro-table/typing'

const proFormSelect = defineComponent({
  name: 'ProFormSelect',
  props: {
    ...selectProps,
    ...proFormField,
    valueEnum: {
      type: Object as PropType<Record<string | number, ProTableValueEnum>>,
      default: undefined,
    },
  },
  setup(props) {
    const options = computed(() => {
      const opt: SelectOption[] = []
      for (const valueEnumKey in props.valueEnum) {
        const val = props.valueEnum[valueEnumKey]
        opt.push({
          label: val.label,
          key: valueEnumKey,
          value: valueEnumKey,
        })
      }
      return opt
    })
    return () => {
      const { value, mode } = props
      if (mode === 'read') {
        // TODO: 读模式
        const val = props.valueEnum?.[value]
        if (val) {
          const status = val.status
          if (!status)
            return <>{val.label}</>

          // 处理有值的情况
          return (
            <NSpace>
              <NBadge
                type={status}
                dot={true}
              />
              {val.label}
            </NSpace>
          )
        }
        return <>{value}</>
      }
      return (
        <NSelect
          {...props}
          value={value}
          options={options.value}
        >
        </NSelect>
      )
    }
  },
})

export default proFormSelect
