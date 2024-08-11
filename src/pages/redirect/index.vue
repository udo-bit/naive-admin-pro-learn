<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const params = route.params
if (params.path)
  router.replace(params.path as string)
else router.replace('/')
</script>

<template>
  <div>
    <!---->
  </div>
</template>
