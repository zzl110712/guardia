<template>
  <!-- Vue Router 4 ：需要使用插槽属性（slot props）的方式，通过 v-slot="{ Component }" 获取当前路由组件，然后使用 <component :is="Component" /> 来渲染 -->
  <router-view v-slot="{ Component }">
    <keep-alive v-if="shouldKeepAlive">
      <component :is="Component" />
    </keep-alive>
    <component :is="Component" v-else />
  </router-view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// 定义 props
const props = defineProps({
  keepAlive: {
    type: Boolean,
    default: true
  }
})

// 获取当前路由
const route = useRoute()

// 计算是否应该使用 keep-alive
const shouldKeepAlive = computed(() => {
  // 优先使用路由 meta 中的 keepAlive 属性
  // 如果没有设置，则使用组件的 keepAlive prop
  return route.meta.keepAlive ?? props.keepAlive
})
</script>

<style scoped>
/* 可以在这里添加样式 */
</style>
