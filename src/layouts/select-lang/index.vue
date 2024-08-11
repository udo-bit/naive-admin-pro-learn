<script lang="ts" setup>
import LangIcon from './lang-icon.vue'

defineProps<{
  value: string
}>()
const emit = defineEmits(['update:value'])
const appStore = useAppStore()
const handleSelect = (lang: string) => {
  emit('update:value', lang)
}
</script>

<template>
  <n-dropdown
    trigger="hover"
    :value="value"
    :options="appStore.localesOptions"
    @select="handleSelect"
  >
    <div class="text-18px cursor-pointer">
      <LangIcon />
    </div>
  </n-dropdown>
</template>

<style scoped></style>
