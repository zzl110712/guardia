<template>
  <a-layout-header style="background: #fff; padding: 0; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); display: flex; justify-content: space-between; align-items: center">
    <div style="display: flex; align-items: center">
      <MenuUnfoldOutlined
        v-if="props.collapsed"
        class="trigger"
        @click="props.onToggleCollapse"
      />
      <MenuFoldOutlined v-else class="trigger" @click="props.onToggleCollapse" />
      <span class="header-title">Vue3 + TypeScript + AntD-Vue Demo</span>
    </div>
    <div class="user-info">
      <a-dropdown>
        <div class="user-dropdown">
          <a-avatar :src="userStore.avatar" :size="32" style="margin-right: 8px">
            <template v-if="!userStore.avatar">{{ userStore.name?.charAt(0) }}</template>
          </a-avatar>
          <span>{{ userStore.name }}</span>
          <DownOutlined style="margin-left: 4px" />
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="handleLogout">
              <LogoutOutlined />
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
  collapsed: boolean
  onToggleCollapse: () => void
}>()

const router = useRouter()
const userStore = useUserStore()

const handleLogout = async () => {
  await userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.header-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  line-height: 64px;
}

.user-info {
  padding-right: 24px;
}

.user-dropdown {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 12px;
  height: 64px;
  transition: background-color 0.3s;
}

.user-dropdown:hover {
  background-color: #f5f5f5;
}
</style>