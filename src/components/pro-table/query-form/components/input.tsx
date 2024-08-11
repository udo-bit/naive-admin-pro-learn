import { NInput, inputProps } from 'naive-ui'
import { proFormField } from '~/components/pro-table/query-form/components/typing'

const proFormInput = defineComponent({
  name: 'ProFormInput',
  props: {
    ...inputProps,
    ...proFormField,
  },
  setup(props) {
    return () => {
      const { value, mode, ...restProps } = props
      if (mode === 'read')
        return value

      return (
        <NInput
          {...restProps}
          value={value}
        >
        </NInput>
      )
    }
  },
})

export default proFormInput
