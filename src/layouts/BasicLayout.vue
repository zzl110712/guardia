<template>
  <a-layout style="min-height: 100vh">
    <SideMenu :collapsed="collapsed" />
    <a-layout>
      <Header :collapsed="collapsed" :onToggleCollapse="toggleCollapse" />
      <div class="traceList">
        <a-button
          :type="value.path === currentRoute ? 'primary' : 'default'"
          shape="round"
          size="large"
          v-for="value of trace"
          :key="value.path"
          @click="handleClick(value.path)"
        >{{ value.meta?.title }}</a-button>
      </div>
      <Content />
      <Footer />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SideMenu from './components/SideMenu.vue'
import Header from './components/Header.vue'
import Content from './components/Content.vue'
import Footer from './components/Footer.vue'
import { useStaticRouterStore } from '@/store/static-router'
import { useRouteHelpers } from '@/composables/useRouteHelpers'

const { currentRoute } = useRouteHelpers()
const router = useRouter()

const trace = useStaticRouterStore().trace
const collapsed = ref<boolean>(false)

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}

const handleClick = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
/* 基础布局样式 */
.traceList {
  width: calc(100% - 48px);
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  margin: 24px 24px 0;
  justify-content: flex-start;
  button {
    margin-right: 12px;
  }
}
</style>