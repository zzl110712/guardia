<template>
  <div class="not-found">
    <a-result
      status="404"
      title="404"
      sub-title="抱歉，您访问的页面不存在"
    >
      <template #extra>
        <a-button type="primary" @click="goBack">返回上一页</a-button>
        <a-button style="margin-left: 8px" @click="goHome">返回首页</a-button>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/dashboard/workplace')
}
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 24px;
}
</style>