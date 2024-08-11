<script lang="ts" setup>
import * as icons from '@vicons/antd'

defineProps<{
  icon: string
}>()
</script>

<template>
  <n-icon :component="(icons as any)[icon]" />
</template>
