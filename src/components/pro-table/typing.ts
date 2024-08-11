import type { ExtractPropTypes, PropType, VNodeChild } from '@vue/runtime-core'
import type { DataTableColumn } from 'naive-ui'
import { dataTableProps } from 'naive-ui'

export interface ProTableValueEnum {
  label: string | (() => VNodeChild)
  value: string | number
  status?: 'default' | 'success' | 'error' | 'warning' | 'info'
}

export type ProTableColumn = DataTableColumn & {
  valueType?: 'input' | 'select'
  valueEnum?: Record<string, ProTableValueEnum>
  key?: string
  title?: string
  hideInSearch?: boolean
  fieldProps?: Record<string, any>
}

export interface ProTableOptions {
  reload?: boolean
  setting?: boolean
}

export interface ProTableRequestCallback {
  data: Record<string, any>[]
  total: number
}

export type ProTableRequest = (params?: Record<string, any>) => Promise<ProTableRequestCallback>

export const proTableProps = {
  ...dataTableProps,
  columns: {
    type: Array as PropType<ProTableColumn[]>,
    default: () => [],
  },
  options: {
    type: [Object, Boolean] as PropType<false | ProTableOptions>,
    default: () => ({ reload: true, setting: true }),
  },
  request: {
    type: Function as PropType<ProTableRequest>,
    default: undefined,
  },
  params: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  manualRequest: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
}

export type ProTableProps = ExtractPropTypes<typeof proTableProps>
