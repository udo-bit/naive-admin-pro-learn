<script lang="ts" setup>
import { LayoutBase, LayoutContent, LayoutHeader, LayoutSider, Logo, Title } from '~/layouts/common'

const props = withDefaults(
  defineProps<{
    headerHeight?: number
    logo?: string
    title?: string
    siderWidth?: number
    siderCollapsedWidth?: number
    showSiderTrigger?: boolean | 'bar' | 'arrow-circle'
    inverted?: boolean
    collapsed?: boolean
  }>(),
  {
    headerHeight: 48,
    inverted: false,
    collapsed: false,
    collapsedIconSize: 22,
  },
)
defineEmits(['update:collapsed'])
const headerHeightVar = computed(() => `${props.headerHeight}px`)
</script>

<template>
  <n-layout
    has-sider
    class="h-screen"
  >
    <LayoutSider
      :inverted="inverted"
      :collapsed="collapsed"
      :collapsed-width="siderCollapsedWidth"
      :width="siderWidth"
      :show-trigger="showSiderTrigger"
      @update:collapsed="$event => $emit('update:collapsed', $event)"
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
    </LayoutSider>
    <LayoutBase>
      <LayoutHeader class="pro-admin-mix-layout-header flex justify-between items-center px-4">
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
  </n-layout>
</template>

<style scoped>
  .pro-admin-mix-layout-header {
    height: v-bind(headerHeightVar);
  }
</style>
