import { createRouter, createWebHistory, type Router } from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

const router = createRouter({
  history: createWebHistory(),
  routes: constantRouterMap
})

/**
 * 扩展 Router 类型，添加内部属性
 */
interface ExtendedRouter extends Router {
  history: any
  matcher: any
}

/**
 * 重置路由
 * 用于退出登录后或 token 过期后重新登录时，防止路由重复添加
 */
export function resetRouter () {
  const newRouter = createRouter({
    history: createWebHistory(),
    routes: constantRouterMap
  })
  const extendedRouter = router as ExtendedRouter
  extendedRouter.matcher = (newRouter as any).matcher
}

export default router
