<script lang="ts" setup>
import type { DropdownOption } from 'naive-ui'

defineProps<{
  avatar?: string
  nickname?: string
  options?: DropdownOption[]
  onSelect?: (value: string) => void
}>()
</script>

<template>
  <n-dropdown
    trigger="hover"
    :options="options"
    @select="onSelect"
  >
    <div class="flex items-center cursor-pointer">
      <n-avatar
        v-if="avatar"
        round
        size="small"
        :src="avatar"
      />
      <span
        v-if="nickname"
        class="ml-2"
      >{{ nickname }}</span>
    </div>
  </n-dropdown>
</template>

<style scoped></style>
