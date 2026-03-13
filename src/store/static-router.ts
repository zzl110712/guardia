import { defineStore } from 'pinia'
import { cloneDeep } from '@/utils/index'
import { asyncRouterMap, constantRouterMap, notFoundRouter, type RouterConfig } from '@/config/router.config'
import type { UserInfo, RoleInfo } from '@/api'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission 权限列表
 * @param route 路由配置
 * @returns {boolean} 是否有权限
 */
function hasPermission (permission: string[], route: RouterConfig): boolean {
  if (route.meta && route.meta.permission) {
    console.log('hasPermission', permission)
    if (permission === undefined) {
      return false
    }
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta!.permission!.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

/**
 * 过滤异步路由
 * @param routerMap 路由配置列表
 * @param role 角色信息
 * @returns 过滤后的路由配置列表
 */
const filterAsyncRouter = (routerMap: RouterConfig[], role: RoleInfo): RouterConfig[] => {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(role.permissionList || [], route)) {
      if (route.children?.length) {
        route.children = filterAsyncRouter(route.children, role)
        // 如果有子路由，设置redirect为第一个子路由
        if (route.children.length > 0) {
          const firstChild = route.children[0];
          route.redirect = firstChild.redirect || firstChild.path;
        }
      }
      return true
    }
    return false
  })
  return accessedRouters
}

export const useStaticRouterStore = defineStore('static-router', {
  state: () => ({
    routes: constantRouterMap,
    addRouters: [] as RouterConfig[],
    trace: [] as RouterConfig[]
  }),
  actions: {
    GenerateRoutes (data: UserInfo) {
      return new Promise<RouterConfig[]>((resolve) => {
        const { role } = data
        const routerMap = cloneDeep(asyncRouterMap)
        const accessedRouters = filterAsyncRouter(routerMap, role)
        // 添加404路由到动态路由的最后
        this.addRouters = accessedRouters
        this.routes = constantRouterMap.concat(accessedRouters, [notFoundRouter])
        
        resolve(this.routes)
      })
    },
    setTrace (trace: RouterConfig | RouterConfig[]) {
      // 类型判断与处理
      if (Array.isArray(trace)) {
        // 处理数组类型（包括空数组）
        this.trace = trace;
      } else {
        // 处理单个对象类型
        // 检查是否已存在相同path的元素
        const existingIndex = this.trace.findIndex(t => t.path === trace.path);
        if (existingIndex === -1) {
          // 添加到数组最前面
          this.trace.push(trace);
        }
      }
    }
  }
})
