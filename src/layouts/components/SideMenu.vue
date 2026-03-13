<template>
  <a-layout-sider width="200" style="background: #001529" v-model:collapsed="props.collapsed" :trigger="null" collapsible>
    <div class="logo" />
    <a-menu
      mode="inline"
      theme="dark"
      :selected-keys="[currentRoute]"
      :open-keys="openKeys"
      :style="{ height: '100%', borderRight: 0 }"
      @click="handleClick"
    >
      <template v-for="route in menuRoutes" :key="route.path">
        <a-sub-menu v-if="route.children && route.children.length > 0" :key="route.path">
          <template #title>
            <component :is="getIcon(route.meta?.icon as string)" />
            <span>{{ route.meta?.title }}</span>
          </template>
          <a-menu-item v-for="childRoute in route.children" :key="childRoute.path">
            <span>{{ childRoute.meta?.title }}</span>
          </a-menu-item>
        </a-sub-menu>
        <template v-else>
          <a-menu-item :key="route.path">
            <template #icon>
              <component :is="getIcon(route.meta?.icon as string)" />
            </template>
            <span>{{ route.meta?.title }}</span>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
// import { useStaticRouterStore } from '@/store/static-router'
import { useAsyncRouterStore } from '@/store/async-router'
import { HomeOutlined, InfoCircleOutlined, PhoneOutlined } from '@ant-design/icons-vue'
import { useRouteHelpers } from '@/composables/useRouteHelpers'

const props = defineProps<{
  collapsed: boolean
}>()

const { currentRoute, currentPathArray } = useRouteHelpers()
const router = useRouter()

// 获取路由配置，用于生成菜单（过滤掉hidden的路由）
const menuRoutes = computed(() => {
  const syncRouterStore = useAsyncRouterStore()
  // 直接从路由配置中获取顶层路由，避免getRoutes()将所有路由平铺
  const allRoutes = syncRouterStore.addRouters
  const topRoutes = allRoutes.find(item => item.path === '/')
  const routes = topRoutes?.children ?? []
  // 过滤出需要显示在菜单中的路由
  return routes.filter(route => {
    // 条件：有title元信息
    // return route.meta && route.meta.title && !route.meta.hidden
    return route.meta && route.meta.title && !route.meta.show
  })
})

// 根据图标名称获取图标组件
const getIcon = (iconName?: string) => {
  const icons: Record<string, any> = {
    HomeOutlined,
    InfoCircleOutlined,
    PhoneOutlined
  }
  return icons[iconName || ''] || HomeOutlined
}

// 计算当前路由的父路径，用于展开对应的子菜单
const openKeys = computed(() => {
  return currentPathArray.value
})

const handleClick = ({ key }: { key: string }) => {
  router.push(key)
}
</script>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

:deep(.ant-menu) {
  height: calc(100% - 64px) !important;
}
</style>