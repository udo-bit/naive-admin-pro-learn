<script lang="ts" setup>
import SettingDrawer from '../setting-drawer/index.vue'
import RightContent from './right-content.vue'
import WrapContent from './wrap-content.vue'
import BasicLayout from './basic-layout.vue'

const appStore = useAppStore()
const userStore = useUserStore()
const menuOptions = computed(() => userStore.menusData)
const { layout, visible, layoutList, layoutStyleList, themeList } = storeToRefs(appStore)
const { isMobile, isPad, isDesktop } = useQueryBreakpoints()
const { active } = useMenuState()
watchEffect(() => {
  if (isPad.value)
    appStore.toggleCollapsed(true)
  else if (isDesktop.value)
    appStore.toggleCollapsed(false)
  if (isMobile.value)
    appStore.toggleVisible(false)
})
</script>

<template>
  <BasicLayout
    v-model:collapsed="layout.collapsed"
    v-model:visible="visible"
    :logo="layout.logo"
    :title="layout.title"
    :options="menuOptions"
    :inverted="layout.layoutStyle === 'inverted'"
    :active="active"
    :layout="layout.layout"
    :is-mobile="isMobile"
    :show-sider-trigger="layout.showSiderTrigger"
    :sider-width="layout.siderWidth"
    :sider-collapsed-width="layout.siderCollapsedWidth"
    :header-fixed="layout.fixed"
  >
    <template #headerRight>
      <RightContent />
    </template>
    <WrapContent />
  </BasicLayout>

  <SettingDrawer
    v-model:layout-style="layout.layoutStyle"
    v-model:layout="layout.layout"
    v-model:theme="layout.theme"
    v-model:header-fixed="layout.fixed"
    :layout-list="layoutList"
    :theme-list="themeList"
    :layout-style-list="layoutStyleList"
  />
</template>

<style scoped></style>
