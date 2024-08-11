<script lang="ts" setup>
import { MenuUnfoldOutlined } from '@vicons/antd'
import type { MenuOption } from 'naive-ui'
import SideMenu from '../side-menu/index.vue'
import { LayoutBase, LayoutContent, LayoutHeader, LayoutSider, Logo, Title } from '~/layouts/common'

const props = withDefaults(
  defineProps<{
    headerHeight?: number
    logo?: string
    title?: string
    siderWidth?: number
    siderCollapsedWidth?: number
    showSiderTrigger?: boolean | 'bar' | 'arrow-circle'
    collapsed?: boolean
    active?: string
    options?: MenuOption[]
    collapsedIconSize?: number
    expandedKeys?: string[]
    layout?: 'side' | 'mix' | 'top'
    inverted?: boolean
    visible?: boolean
    logoVisible?: boolean
    isMobile?: boolean
    headerFixed?: boolean
  }>(),
  {
    headerHeight: 48,
    collapsed: false,
    collapsedIconSize: 22,
    layout: 'mix',
    inverted: false,
    visible: false,
    logoVisible: true,
    isMobile: false,
    headerFixed: false,
  },
)
const emit = defineEmits(['update:visible', 'update:collapsed', 'update:active', 'update:expandedKeys'])

const headerHeightVar = computed(() => `${props.headerHeight}px`)
const contentHeightVar = computed(() => `calc(100vh - ${props.layout === 'side' ? '0px' : props.headerHeight}px)`)
const baseSider = computed(() => props.layout === 'side' && !props.isMobile)
const innerSider = computed(() => props.layout === 'mix' && !props.isMobile)
const headerInverted = computed(() => (props.layout === 'mix' ? true : props.inverted))
const headerFixedStyle = computed(() => ({
  position: props.headerFixed ? 'fixed' : undefined,
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1,
  paddingLeft: props.headerFixed ? `calc(${props.collapsed ? props.siderCollapsedWidth : props.siderWidth}px + 1rem)` : 'pl-4',
}))
const onShow = () => {
  emit('update:visible', true)
}
</script>

<template>
  <LayoutBase
    :has-sider="baseSider"
    class="h-screen"
  >
    <LayoutHeader
      v-if="layout !== 'side' || isMobile"
      :inverted="headerInverted"
      class="pro-admin-mix-layout-header flex justify-between items-center px-4"
    >
      <div class="flex items-center">
        <Logo :src="logo" />
        <n-icon
          v-if="isMobile"
          size="24"
          class="ml-12px"
          @click="onShow"
        >
          <MenuUnfoldOutlined />
        </n-icon>
        <Title
          v-else
          :title="title"
        />
        <SideMenu
          v-if="layout === 'top' && !isMobile"
          :collapsed="collapsed"
          :inverted="inverted"
          :collapsed-width="siderCollapsedWidth"
          :value="active"
          mode="horizontal"
          :options="options"
          :collapsed-icon-size="collapsedIconSize"
          :expanded-keys="expandedKeys"
          @update:value="$emit('update:active', $event)"
          @update:expanded-keys="$emit('update:expandedKeys', $event)"
        />
      </div>
      <slot name="headerRight">
        <div>右侧</div>
      </slot>
    </LayoutHeader>
    <LayoutSider
      v-if="layout === 'side' && !isMobile"
      :inverted="inverted"
      :collapsed="collapsed"
      :collapsed-width="siderCollapsedWidth"
      :width="siderWidth"
      style="z-index: 2"
      :show-trigger="showSiderTrigger"
      @update:collapsed="$emit('update:collapsed', $event)"
    >
      <div class="flex items-center justify-center mt-24px">
        <Logo
          :src="logo"
          size="30"
        />
        <Title
          v-if="!collapsed"
          :title="title"
          size="22"
        />
      </div>
      <SideMenu
        :collapsed="collapsed"
        :inverted="inverted"
        :collapsed-width="siderCollapsedWidth"
        :value="active"
        :options="options"
        :collapsed-icon-size="collapsedIconSize"
        :expanded-keys="expandedKeys"
        @update:value="$emit('update:active', $event)"
        @update:expanded-keys="$emit('update:expandedKeys', $event)"
      />
    </LayoutSider>
    <LayoutBase
      :has-sider="innerSider"
      class="pro-admin-mix-layout-content"
    >
      <LayoutSider
        v-if="layout === 'mix' && !isMobile"
        :collapsed-width="siderCollapsedWidth"
        :width="siderWidth"
        :collapsed="collapsed"
        :show-trigger="showSiderTrigger"
        @update:collapsed="$emit('update:collapsed', $event)"
      >
        <SideMenu
          :collapsed="collapsed"
          :collapsed-width="siderCollapsedWidth"
          :value="active"
          :options="options"
          :collapsed-icon-size="collapsedIconSize"
          :expanded-keys="expandedKeys"
          @update:value="$emit('update:active', $event)"
          @update:expanded-keys="$emit('update:expandedKeys', $event)"
        />
      </LayoutSider>
      <div
        v-if="headerFixed"
        class="pro-admin-mix-layout-header"
      />
      <LayoutHeader
        v-if="layout === 'side' && !isMobile"
        class="pro-admin-mix-layout-header flex justify-between items-center px-4 relative z-1"
        :style="headerFixedStyle"
      >
        <slot name="headerLeft">
          <div />
        </slot>
        <slot name="headerRight">
          <div />
        </slot>
      </LayoutHeader>
      <LayoutContent>
        <slot />
      </LayoutContent>
    </LayoutBase>
    <n-drawer
      :show="visible && isMobile"
      :width="240"
      placement="left"
      @update:show="val => $emit('update:visible', val)"
    >
      <n-drawer-content body-content-style="padding: 0">
        <n-layout class="h-100%">
          <n-layout-header
            class="h-60px"
            inverted
          >
            <div
              v-if="logoVisible"
              class="flex items-center justify-center py-12px"
            >
              <Logo
                :src="logo"
                size="26"
              />
              <Title
                :title="title"
                size="22"
              />
            </div>
          </n-layout-header>
          <n-layout-content style="height: calc(100% - 60px)">
            <n-el
              tag="div"
              class="bg-[var(--inverted-color)] h-100%"
            >
              <SideMenu
                :inverted="true"
                :value="active"
                :options="options"
                :expanded-keys="expandedKeys"
                @update:value="$emit('update:active', $event)"
                @update:expanded-keys="$emit('update:expandedKeys', $event)"
              />
            </n-el>
          </n-layout-content>
        </n-layout>
      </n-drawer-content>
    </n-drawer>
  </LayoutBase>
</template>

<style scoped>
  .pro-admin-mix-layout-header {
    height: v-bind(headerHeightVar);
  }
  .pro-admin-mix-layout-content {
    height: v-bind(contentHeightVar);
  }
</style>
