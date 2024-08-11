<script lang="ts" setup>
import type { DropdownOption } from 'naive-ui'
import { FullscreenExitOutlined, FullscreenOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@vicons/antd'
import { NIcon } from 'naive-ui'
import type { Component } from 'vue'
import { useFullscreen } from '@vueuse/core'
import SelectLang from '../select-lang/index.vue'
import SelectUser from '../select-user/index.vue'
import Notify from '../notify/index.vue'

const appLocale = useAppLocale()
const userStore = useUserStore()
const avatar = computed(() => userStore.userInfo?.avatar)
const nickname = computed(() => userStore.userInfo?.nickname || userStore.userInfo?.username)
const { t } = useI18n()
const renderIcon = (icon: Component) => h(NIcon, null, { default: () => h(icon) })
const { toggle, isFullscreen } = useFullscreen()

const userOptions = ref<DropdownOption[]>([
  {
    label: () => t('global.layout.header.right.user.center'),
    key: 'user-center',
    icon: () => renderIcon(UserOutlined),
  },
  {
    label: () => t('global.layout.header.right.user.setting'),
    key: 'user-setting',
    icon: () => renderIcon(SettingOutlined),
  },
  {
    key: 'header-divider',
    type: 'divider',
  },
  {
    label: () => t('global.layout.header.right.logout'),
    icon: () => renderIcon(LogoutOutlined),
    key: 'logout',
  },
])

const userSelect = (key: string) => {
  if (key === 'logout')
    userStore.logout()
}
</script>

<template>
  <div class="flex gap-4 items-center">
    <Notify />
    <NIcon
      size="18"
      class="cursor-pointer"
    >
      <FullscreenOutlined
        v-if="!isFullscreen"
        @click="() => toggle()"
      />
      <FullscreenExitOutlined
        v-else
        @click="() => toggle()"
      />
    </NIcon>
    <SelectUser
      :avatar="avatar"
      :nickname="nickname"
      :options="userOptions"
      @select="userSelect"
    />
    <SelectLang v-model:value="appLocale" />
  </div>
</template>

<style scoped></style>
