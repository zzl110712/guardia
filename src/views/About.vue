<template>
  <div class="about">
    <a-card title="关于我们" class="card">
      <p>这是一个使用以下技术栈构建的示例项目：</p>
      <a-list>
        <a-list-item>Vue 3 (Composition API)</a-list-item>
        <a-list-item>TypeScript</a-list-item>
        <a-list-item>Ant Design Vue</a-list-item>
        <a-list-item>Vue Router</a-list-item>
        <a-list-item>Pinia</a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script setup lang="ts">
// About 页面逻辑
</script>

<style scoped>
.about {
  padding: 24px;
}

.card {
  margin-bottom: 24px;
}
</style>