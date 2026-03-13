<template>
  <a-layout-content style="margin: 24px; padding: 24px; background: #fff; min-height: 280px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
        <router-link v-if="item.path" :to="item.path">{{ item.title }}</router-link>
        <span v-else>{{ item.title }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <router-view />
    <slot />
  </a-layout-content>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 获取当前路由信息重构面包屑导航
const breadcrumbs = computed(() => {
  const matched = route.matched.filter(item => item.meta && item.meta.title)
  return matched.map(item => ({
    path: item.path,
    title: item.meta.title as string
  }))
})
</script>

<style scoped>
/* 保持视图组件的样式 */
.card {
  margin-bottom: 24px;
}

.btn {
  margin-top: 16px;
}

.form {
  max-width: 500px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
}
</style>