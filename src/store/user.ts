import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { localStorage, STORAGE_KEYS } from '@/utils/storage'
import { login, getUserInfo, logout } from '@/api/index'
import { useStaticRouterStore } from '@/store/static-router'
import type { UserInfo } from '@/api'

// 7天过期时间（毫秒）
const TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    name: '',
    avatar: '',
    roles: {},
    info: {}
  }),
  actions: {
    async login({ username, password }: { username: string; password: string }) {
      try {
        const { data } = await login({
          username,
          password
        })
        this.token = data.token
        localStorage.set(STORAGE_KEYS.TOKEN, this.token, TOKEN_EXPIRY)
        message.success('登录成功')
        return this.token
      } catch (error) {
        message.error('登录失败，请重试')
        return Promise.reject(error)
      }
    },
    async GetInfo() {
      try {
        const { data } = await getUserInfo()
        if (data.role?.permissions.length > 0) {
          const role = { ...data.role, permissionList: [] as string[] }
          role.permissions = data.role.permissions.map(permission => {
            const per = {
              ...permission,
              actionList: (permission.actionEntitySet || {}).map(item => item.action)
            }
            return per
          })
          role.permissionList = role.permissions.map(permission => { return permission.permissionId })
          data.role = role
          this.roles = role
          this.info = data
          this.name = data.name
          this.avatar = data.avatar
          return this.info as UserInfo
        } else {
          message.error('获取用户信息失败，请重试')
          return Promise.reject()
        }
      } catch (error) {
        message.error('获取用户信息失败，请重试')
        return Promise.reject(error)
      }
    },
    async logout() {
      const { data } = await logout()
      const staticRouterStore = useStaticRouterStore()
      if (data.success) {
        this.token = ''
        this.name = ''
        this.avatar = ''
        Object.assign(this.roles, {})
        Object.assign(this.info, {})
        localStorage.remove(STORAGE_KEYS.TOKEN)
        staticRouterStore.setTrace([])
        message.success('退出成功')
      } else {
        message.error('退出失败，请重试')
      }
    },
    init() {
      const token = localStorage.get<string>(STORAGE_KEYS.TOKEN)
      if (token) {
        this.token = token
      }
    }
  }
})
