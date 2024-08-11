import { ProFormInput, ProFormSelect } from '~/components/pro-table/query-form/components'
import type { ProTableColumn } from '~/components/pro-table/typing'

export const renderField = (item: ProTableColumn, model: Record<string, any>) => {
  // v-model:value
  const commonProps = {
    value: model[item.key!],
    'onUpdate:value': (value: any) => {
      model[item.key!] = value
    },
    ...item.fieldProps,
  }
  if (item.valueType === 'select') {
    return (
      <ProFormSelect
        {...commonProps}
        valueEnum={item.valueEnum}
      />
    )
  }
  return <ProFormInput {...commonProps} />
}
