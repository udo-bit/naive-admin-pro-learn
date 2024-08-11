import type { PropType } from '@vue/runtime-core'

export const proFormField = {
  // 支持两种模式
  mode: {
    type: String as PropType<'edit' | 'read'>,
    default: 'edit',
  },
  // v-model:value
  value: {
    type: [String, Number, Boolean, Array, Object] as PropType<any>,
    default: undefined,
  },
  'onUpdate:value': {
    type: Function as PropType<(value: any) => void>,
    default: undefined,
  },
}
