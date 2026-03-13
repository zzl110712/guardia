import BasicLayout from '@/layouts/BasicLayout.vue'
import RouteView from '@/layouts/RouteView.vue'
import type { RouteRecordRaw } from 'vue-router'

/**
 * 路由配置类型
 */
export type RouterConfig = RouteRecordRaw & {
  children?: RouterConfig[]
  meta?: {
    title?: string
    icon?: any
    keepAlive?: boolean
    permission?: string[]
    hidden?: boolean
  }
}


export const asyncRouterMap: RouterConfig[] = [
  {
    path: '/',
    name: 'home',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/workplace',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: 'HomeOutlined', permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/index.vue'),
            meta: { title: 'menu.dashboard.workplace', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/contact',
            name: 'Contact',
            component: () => import('@/views/Contact.vue'),
            meta: { title: 'menu.dashboard.contact', keepAlive: false, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
        meta: { title: 'menu.about', keepAlive: false, icon: 'InfoCircleOutlined', permission: ['table'] }
      }
    ]
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap: RouterConfig[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      hidden: true
    }
  }
]

/**
 * 404路由
 */
export const notFoundRouter: RouterConfig = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/404.vue'),
  meta: {
    hidden: true
  }
}