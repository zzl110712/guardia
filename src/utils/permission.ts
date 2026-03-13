import router from "@/router";
import { localStorage, STORAGE_KEYS } from '@/utils/storage'
import { useUserStore } from '@/store/user'
import { resetRouter } from '@/router'
// import { useStaticRouterStore } from '@/store/static-router'
import { useAsyncRouterStore } from '@/store/async-router'
import { notFoundRouter } from '@/config/router.config'
import { notification } from 'ant-design-vue';
import type { RouterConfig } from '@/config/router.config'

const allowList = ['login'] // 免验证页面
const loginRoutePath = '/login' // 登录页路径
const defaultRoutePath = '/dashboard/workplace'

router.beforeEach((to, from, next) => {
  const token = localStorage.get(STORAGE_KEYS.TOKEN)
  const userStore = useUserStore()
  // const staticRouterStore = useAsyncRouterStore()
  const asyncRouterStore = useAsyncRouterStore()
  // 有 token
  if (token) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
    } else {
      // 如果存在角色信息即视为登录用户
      if (Object.keys(userStore.roles).length === 0) {
        userStore.GetInfo().then(res => {
          console.log(res);
          // staticRouterStore.GenerateRoutes(res).then(() => {
          asyncRouterStore.GenerateRoutes().then(() => {
            resetRouter() // 重置路由 防止退出重新登录或者 token 过期后页面未刷新，导致的路由重复添加
            // staticRouterStore.addRouters.forEach(r => {
            //   router.addRoute(r)
            // })
            asyncRouterStore.addRouters.forEach(r => {
              router.addRoute(r as any)
            })
            // 添加404路由到最后
            router.addRoute(notFoundRouter)
            // 请求带有 redirect 重定向时，登录自动重定向到该地址
            const redirectParam = from.query.redirect
            const redirectValue = Array.isArray(redirectParam) ? redirectParam[0] : redirectParam
            const redirect = decodeURIComponent(redirectValue || to.path)
            if (to.path === redirect) {
              // set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true })
            } else {
              // 跳转到目的路由
              next({ path: redirect })
            }
          })
        }).catch(() => {
          notification.error({
            message: '错误',
            description: '请求用户信息失败，请重试'
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (allowList.includes(to.name as string)) {
      // 在免登录名单，直接进入
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
    }
  }
})

// 路由跳转后执行
router.afterEach((to) => {
  // const staticRouterStore = useStaticRouterStore()
  // 滚动到顶部
  window.scrollTo(0, 0)
  // staticRouterStore.setTrace(to as unknown as RouterConfig)
})
