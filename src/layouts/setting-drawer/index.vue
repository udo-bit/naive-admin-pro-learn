<script lang="ts" setup>
import { CloseOutlined, SettingOutlined } from '@vicons/antd'
import CheckboxLayout from './checkbox-layout.vue'
import CheckboxTheme from './checkbox-theme.vue'
import Container from './container.vue'
import type { LayoutType } from '~/config/layout-theme'
import type { ThemeType } from '~/config/theme'

const props = withDefaults(
  defineProps<{
    floatTop?: number | string
    drawerWidth?: number | string
    layout?: 'mix' | 'side' | 'top'
    layoutStyle?: 'inverted' | 'light'
    layoutList?: LayoutType[]
    layoutStyleList?: LayoutType[]
    themeList?: ThemeType[]
    theme?: string
    headerFixed?: boolean
  }>(),
  {
    floatTop: 240,
    drawerWidth: 300,
    headerFixed: false,
  },
)

const emit = defineEmits(['update:layout', 'update:layoutStyle', 'update:theme', 'update:headerFixed'])

const show = ref(false)

const handleClick = (val: boolean) => {
  show.value = val
}

const cssVars = computed(() => {
  return {
    '--pro-admin-float-top': `${props.floatTop}px`,
    '--pro-admin-drawer-width': `${props.drawerWidth}px`,
  }
})

const onThemeChange = (val: string) => {
  emit('update:theme', val)
}
</script>

<template>
  <teleport to="body">
    <div
      :style="cssVars"
      class="fixed top-[var(--pro-admin-float-top)] right-0"
    >
      <!---->
      <n-button
        size="large"
        class="b-rd-tr-0! b-rd-br-0!"
        type="primary"
        @click="handleClick(true)"
      >
        <template #icon>
          <n-icon size="24">
            <SettingOutlined />
          </n-icon>
        </template>
      </n-button>
    </div>
  </teleport>
  <n-drawer
    v-model:show="show"
    :width="drawerWidth"
  >
    <n-drawer-content>
      <Container
        v-if="layoutStyleList"
        :title="$t('global.layout.setting.drawer.style')"
      >
        <n-space size="large">
          <template
            v-for="item in layoutStyleList"
            :key="item.id"
          >
            <CheckboxLayout
              :title="$t(item.title)"
              :layout="item.key"
              :inverted="item.inverted"
              :dark="item.dark"
              :checked="item.id === layoutStyle"
              @click="() => $emit('update:layoutStyle', item.id)"
            />
          </template>
        </n-space>
      </Container>
      <Container
        v-if="themeList"
        :title="$t('global.layout.setting.drawer.theme')"
      >
        <n-space>
          <CheckboxTheme
            v-for="item in themeList"
            :key="item.key"
            :color="item.color"
            :title="$t(item.title ?? '')"
            :checked="item.key === theme"
            @click="onThemeChange(item.key)"
          />
        </n-space>
      </Container>
      <n-divider />
      <Container
        v-if="layoutList"
        :title="$t('global.layout.setting.drawer.layout')"
      >
        <n-space size="large">
          <template
            v-for="item in layoutList"
            :key="item.key"
          >
            <CheckboxLayout
              :title="$t(item.title)"
              :layout="item.key"
              :checked="item.key === layout"
              @click="() => $emit('update:layout', item.key)"
            />
          </template>
        </n-space>
        <div class="flex flex-col mt-15px">
          <div class="flex w-100% items-center justify-between">
            <!--                -->
            <div>{{ $t('global.layout.setting.drawer.layout.fixed.header') }}</div>
            <n-switch
              :disabled="layout !== 'side'"
              :value="headerFixed!"
              @update:value="$event => $emit('update:headerFixed', $event)"
            />
          </div>
        </div>
      </Container>
    </n-drawer-content>
    <div
      :style="cssVars"
      class="absolute top-[var(--pro-admin-float-top)] right-[var(--pro-admin-drawer-width)]"
    >
      <!---->
      <n-button
        size="large"
        class="b-rd-tr-0! b-rd-br-0!"
        type="primary"
        @click="handleClick(false)"
      >
        <template #icon>
          <n-icon size="24">
            <CloseOutlined />
          </n-icon>
        </template>
      </n-button>
    </div>
  </n-drawer>
</template>

<style scoped></style>
