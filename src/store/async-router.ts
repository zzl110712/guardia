import { defineStore } from 'pinia'
import { constantRouterMap, type RouterConfig } from '@/config/router.config'
import { generatorDynamicRouter } from '@/router/generator-routers'
import type { NavMenu } from '@/api'

export const useAsyncRouterStore = defineStore('async-router', {
  state: () => ({
    routes: constantRouterMap,
    addRouters: [] as NavMenu,
    trace: [] as NavMenu
  }),
  actions: {
    GenerateRoutes (): Promise<RouterConfig[]> {
      return generatorDynamicRouter().then(res => {
        this.addRouters = res
        this.routes = constantRouterMap.concat(res as unknown as RouterConfig[])
        return this.routes
      }).catch(err => {
        console.log(err)
        return Promise.reject(err)
      })
    }
  }
})