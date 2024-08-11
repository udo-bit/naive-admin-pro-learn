<script lang="ts" setup>
defineProps<{
  read?: boolean
  title?: string
  desc?: string
  type?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
  tag?: string
}>()
</script>

<template>
  <n-list-item :class="read ? 'op-40' : ''">
    <n-thing>
      <template
        v-if="title"
        #header
      >
        <span class="text-16px">
          {{ title }}
        </span>
      </template>
      <template
        v-if="tag"
        #header-extra
      >
        <n-tag
          size="small"
          :type="type"
        >
          {{ tag }}
        </n-tag>
      </template>
      <template
        v-if="desc"
        #description
      >
        <span class="text-14px">
          {{ desc }}
        </span>
      </template>
    </n-thing>
  </n-list-item>
</template>

<style scoped></style>
