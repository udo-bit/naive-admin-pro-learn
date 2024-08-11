import type { ExtractPropTypes, PropType } from '@vue/runtime-core'
import type { ProTableColumn } from '~/components/pro-table/typing'

export const queryFormProps = {
  columns: {
    type: Array as PropType<ProTableColumn[]>,
    default: () => [],
  },
  onSearch: {
    type: Function as PropType<(params?: Record<string, any>) => void>,
    default: undefined,
  },
  onReset: {
    type: Function as PropType<(params?: Record<string, any>) => void>,
    default: undefined,
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
}

export type QueryFormProps = ExtractPropTypes<typeof queryFormProps>
