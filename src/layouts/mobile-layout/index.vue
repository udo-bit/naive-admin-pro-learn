<script lang="ts" setup>
import { MenuUnfoldOutlined } from '@vicons/antd'
import { LayoutBase, LayoutContent, LayoutHeader, Logo, Title } from '~/layouts/common'

const props = withDefaults(
  defineProps<{
    headerHeight?: number
    logo?: string
    title?: string
    headerInverted?: boolean
    drawerInverted?: boolean
    visible?: boolean
    logoVisible?: boolean
  }>(),
  {
    headerHeight: 48,
    headerInverted: false,
    drawerInverted: false,
    visible: false,
    logoVisible: true,
  },
)

const emit = defineEmits(['update:visible'])

const headerHeightVar = computed(() => `${props.headerHeight}px`)

const onShow = () => {
  emit('update:visible', true)
}
</script>

<template>
  <LayoutBase class="h-screen">
    <LayoutHeader
      :inverted="headerInverted"
      class="pro-admin-mix-layout-header flex justify-between items-center px-4"
    >
      <div class="flex items-center">
        <Logo
          :src="logo"
          size="26"
        />
        <n-icon
          size="24"
          class="ml-12px"
          @click="onShow"
        >
          <MenuUnfoldOutlined />
        </n-icon>
      </div>
      <slot name="headerRight">
        <div>右侧</div>
      </slot>
    </LayoutHeader>
    <LayoutContent>
      <slot />
    </LayoutContent>
  </LayoutBase>
  <n-drawer
    :show="visible"
    :width="240"
    placement="left"
    @update:show="val => $emit('update:visible', val)"
  >
    <n-drawer-content body-content-style="padding: 0">
      <n-layout class="h-100%">
        <n-layout-header
          class="h-100%"
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
      </n-layout>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
  .pro-admin-mix-layout-header {
    height: v-bind(headerHeightVar);
  }
</style>
