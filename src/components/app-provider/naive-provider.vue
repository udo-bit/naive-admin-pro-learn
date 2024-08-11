<script lang="ts" setup>
import { useGlobalConfigProvider } from '~/composables/global-config'

const notification = useNotification()
const message = useMessage()
const dialog = useDialog()
const loadingBar = useLoadingBar()
useGlobalConfigProvider({
  notification,
  message,
  dialog,
  loadingBar,
})
</script>

<template>
  <slot />
</template>
