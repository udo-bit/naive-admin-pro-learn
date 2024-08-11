<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    src?: string
    size?: number | string
  }>(),
  {
    size: 24,
  },
)
</script>

<template>
  <n-image
    :src="src"
    :width="size"
    :height="size"
    :preview-disabled="true"
  />
</template>

<style scoped></style>
