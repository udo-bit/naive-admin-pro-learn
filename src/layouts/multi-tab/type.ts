import type { RouteLocationNormalized } from 'vue-router'
import type { InjectionKey } from '@vue/runtime-core'
import type { DefineComponent } from 'vue'

export interface TabItem {
  // 路由地址
  path: string
  // 显示的名称
  tabTitle?: string
  route?: Omit<RouteLocationNormalized, 'matched'>
  key?: string
}

export interface MultiTabState {
  tabList: TabItem[]
  current: string
  guid: () => string
  componentCache: Record<string, DefineComponent>
}

export const MULTI_TAB_STATE_KEY: InjectionKey<MultiTabState> = Symbol('multiTabState')
