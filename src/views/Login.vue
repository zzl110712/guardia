<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <div class="login-logo">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" />
        <h1>Vue3 + TypeScript + AntD-Vue</h1>
      </div>
      
      <a-form
        :model="formState"
        @finish="handleSubmit"
        class="login-form"
      >
        <a-form-item
          name="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input v-model:value="formState.username" placeholder="用户名">
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>
        
        <a-form-item
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model:value="formState.password" placeholder="密码">
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>
        
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            class="login-button"
            block
            :loading="loading"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '../store/user'
import { pendingRequests } from '@/utils/request'
import { notification } from 'ant-design-vue';

const router = useRouter()
const loading = ref(false)
const { login } = useUserStore()

const formState = reactive({
  username: 'admin',
  password: 'admin'
})

watch(pendingRequests, (newValue) => {
  loading.value = newValue > 0
}, { immediate: true })

const handleSubmit = async () => {
  try {
    // 模拟登录请求
    await login(formState)
    router.push('/')
    
    notification.success({ message: '欢迎', description: '欢迎回来' })
  } catch (error) {
    notification.error({ message: '用户信息检索失败', description: error as any })
  } finally {
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.login-form-wrapper {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 32px;
}

.login-logo {
  text-align: center;
  margin-bottom: 32px;
}

.login-logo img {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
}

.login-logo h1 {
  font-size: 20px;
  font-weight: 600;
  color: #1890ff;
  margin: 0;
}

.login-form {
  width: 100%;
}

.login-button {
  margin-top: 24px;
}
</style>
