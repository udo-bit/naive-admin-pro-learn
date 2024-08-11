<script lang="ts" setup>
import { MoreOutlined } from '@vicons/antd'
import type { DropdownOption } from 'naive-ui'
import TabItemComp from './tab-item.vue'
import type { TabItem } from '~/layouts/multi-tab/type'

const router = useRouter()
const contextParam = reactive({
  x: 0,
  y: 0,
  show: false,
})
const { tabList, current, closeTab, refresh } = useMultiTab()
function handleClose(path: string) {
  closeTab(path)
  contextParam.show = false
}

const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault()
  contextParam.show = false
  nextTick().then(() => {
    contextParam.show = true
    contextParam.x = e.clientX
    contextParam.y = e.clientY
  })
}

const renderTab = (item: TabItem) => {
  return h(TabItemComp, { item, onContextMenu: handleContextMenu })
}

const actionOpt = computed<DropdownOption[]>(() => [
  {
    label: '关闭当前页',
    key: 'closeCurrent',
    disabled: tabList.value.length <= 1,
  },
  {
    label: '刷新当前页',
    key: 'refreshCurrent',
  },
])

const handleChange = (val: string) => {
  router.push(val)
  contextParam.show = false
}

const handleActionSelect = (key: string) => {
  if (key === 'closeCurrent')
    closeTab()
  else if (key === 'refreshCurrent')
    refresh()
  contextParam.show = false
}
</script>

<template>
  <n-tabs
    :value="current"
    type="card"
    tab-style="min-width: 80px;"
    class="pt-6px bg-white dark:bg-transparent"
    @update:value="handleChange"
    @close="handleClose"
  >
    <template #prefix>
      <div class="ml-12px" />
    </template>
    <template #suffix>
      <div class="mr-12px">
        <n-dropdown
          trigger="click"
          :options="actionOpt"
          @select="handleActionSelect"
        >
          <n-icon
            size="16"
            class="cursor-pointer"
          >
            <MoreOutlined />
          </n-icon>
        </n-dropdown>
      </div>
    </template>
    <n-tab-pane
      v-for="panel in tabList"
      :key="panel.path"
      closable
      :tab="renderTab(panel)"
      :name="panel.path"
    />
  </n-tabs>
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="contextParam.x"
    :y="contextParam.y"
    :options="actionOpt"
    :show="contextParam.show"
    @select="handleActionSelect"
    @clickoutside="contextParam.show = false"
  />
</template>
