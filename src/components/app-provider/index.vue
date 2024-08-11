<script setup lang="ts">
import NaiveProvider from '~/components/app-provider/naive-provider.vue'
</script>

<template>
  <n-message-provider>
    <n-dialog-provider>
      <n-notification-provider>
        <n-loading-bar-provider>
          <NaiveProvider>
            <slot />
          </NaiveProvider>
        </n-loading-bar-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-message-provider>
</template>
