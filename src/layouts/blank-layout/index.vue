<script lang="ts" setup>
import SelectLang from '../select-lang/index.vue'

const appLocale = useAppLocale()
</script>

<template>
  <n-el
    tag="div"
    flex="~ col"
    class="pro-admin-login-container h-screen"
  >
    <div class="flex flex-shrink-0 h-48px px-24px items-center justify-end">
      <SelectLang v-model:value="appLocale" />
    </div>
    <slot name="prefix" />
    <div class="flex-1">
      <slot />
    </div>
    <slot name="suffix">
      <div
        flex="~ shrink-0"
        class="items-center justify-center my-2"
      >
        <span> Navie Admin Pro &copy; 2022 后台管理系统模板 </span>
        <!--      -->
      </div>
    </slot>
  </n-el>
</template>

<style scoped>
  .pro-admin-login-container {
    background-image: url('~@/assets/images/login-bg.svg');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center 110px;
  }
</style>
