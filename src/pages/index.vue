<script lang="ts" setup>
const onGet = async () => {
  await useGet('https://mock.lingyu.org.cn/mock/642b5d1e939061307ed09d1b/example/200')
}

const onPost = async () => {
  await usePost('https://mock.lingyu.org.cn/mock/642b5d1e939061307ed09d1b/example/post')
}
const onPut = async () => {
  await usePut('https://mock.lingyu.org.cn/mock/642b5d1e939061307ed09d1b/example/put')
}
const onDelete = async () => {
  await useDelete('https://mock.lingyu.org.cn/mock/642b5d1e939061307ed09d1b/example/delete')
}
</script>

<template>
  <div>
    <n-space>
      <n-input />
      <n-button @click="onGet">
        get
      </n-button>
      <n-button @click="onPost">
        post
      </n-button>
      <n-button @click="onPut">
        put
      </n-button>
      <n-button @click="onDelete">
        delete
      </n-button>
    </n-space>
  </div>
</template>

<style scoped></style>
