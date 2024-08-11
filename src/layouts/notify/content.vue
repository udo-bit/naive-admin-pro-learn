<script lang="ts" setup>
import Container from './container.vue'
import NotifyItem from './notify-item.vue'
import MessageItem from './message-item.vue'
import UpcomingItem from './upcoming-item.vue'
</script>

<template>
  <n-tabs
    default-value="notify"
    justify-content="center"
    type="line"
  >
    <n-tab-pane
      name="notify"
      tab="通知"
    >
      <Container>
        <NotifyItem
          title="测试通知"
          desc="五天前"
          avatar="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
        <NotifyItem
          read
          title="测试通知"
          desc="五天前"
          avatar="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
      </Container>
    </n-tab-pane>
    <n-tab-pane
      name="message"
      tab="消息"
    >
      <Container>
        <MessageItem
          title="测试消息"
          content="测试消息描述"
          desc="五天前"
          avatar="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
        <MessageItem
          read
          title="测试消息"
          content="测试消息描述"
          desc="五天前"
          avatar="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
      </Container>
    </n-tab-pane>
    <n-tab-pane
      name="upcoming"
      tab="待办"
    >
      <Container>
        <UpcomingItem
          title="测试任务"
          desc="这是一个任务"
          tag="未开始"
        />
        <UpcomingItem
          title="测试任务1"
          desc="这是一个任务1"
          tag="进行中"
          type="success"
        />
      </Container>
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped></style>
