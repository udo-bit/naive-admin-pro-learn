<script lang="ts" setup>
import { MultiTabConsumer } from '~/layouts/multi-tab/multi-tab-consumer'
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <MultiTabConsumer>
      <component
        :is="Component"
        :key="route.fullPath"
      />
    </MultiTabConsumer>
  </router-view>
</template>
