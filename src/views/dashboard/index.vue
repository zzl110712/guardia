<template>
  <div class="dashboard">
    <a-card title="仪表盘" class="card">
      <p>这是首页的子路由 - 仪表盘页面</p>
      <a-statistic title="总访问量" value="10000" />
      <a-statistic title="用户数" value="500" style="margin-top: 16px" />
      <a-statistic title="转化率" value="25%" style="margin-top: 16px" />
    </a-card>
  </div>
</template>

<script setup lang="ts">
// 仪表盘页面逻辑
</script>

<style scoped>
.dashboard {
  padding: 0;
}

.card {
  margin-bottom: 24px;
}
</style>