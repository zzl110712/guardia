import { markRaw } from 'vue'
import { getCurrentUserNav, type NavMenu, NavItem } from '@/api'
import BasicLayout from '@/layouts/BasicLayout.vue'
import RouteView from '@/layouts/RouteView.vue'
// 前端路由表 (基于动态)
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  // markRaw标记一个对象，使其永远不会被转换为响应式对象
  // Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.
  // 这个警告是因为 Vue 3 检测到组件被包装成了响应式对象，这会导致不必要的性能开销。
  BasicLayout: markRaw(BasicLayout),
  RouteView: markRaw(RouteView),
  '404': () => import(/* webpackChunkName: "error" */ '@/views/404.vue'),

  // 你需要动态引入的页面组件
  Workplace: () => import('@/views/dashboard/index.vue'),
  Contact: () => import('@/views/Contact.vue'),

  // form
  About: () => import('@/views/About.vue')
}

type DeepRequired<T> = T extends object
  ? { [P in keyof T]-?: DeepRequired<T[P]> }
  : T
// 根级菜单
const rootRouter = {
  key: '',
  name: 'index',
  path: '',
  component: 'BasicLayout',
  redirect: '/dashboard',
  meta: {
    title: '首页'
  },
  children: [] as NavMenu
}
/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = async () => {
  try {
    const { data } = await getCurrentUserNav()
    const menuNav = []
    const childrenNav: NavItem[] = []
    listToTree(data, childrenNav, 0)
    rootRouter.children = childrenNav
    menuNav.push(rootRouter)
    console.log('menuNav', menuNav)
    const routers = generator(menuNav)
    return routers
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap: (typeof rootRouter)[], parent?: NavItem) => {
  return routerMap.map(item => {
    const { title, show, hideChildren, hiddenHeaderContent, target, icon } = (item.meta || {}) as {
      title?: string
      show?: boolean
      hideChildren?: boolean
      hiddenHeaderContent?: boolean
      target?: string
      icon?: string
    }

    const currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${(parent && parent.path) || ''}/${item.key}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      component: (constantRouterComponents as Record<string, any>)[item.component || item.key] || (() => import(`@/views/${item.component}`)),
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: title!,
        icon: icon || undefined,
        hiddenHeaderContent: hiddenHeaderContent,
        target: target,
        permission: item.name
      },
      hidden: false,
      hideChildrenInMenu: false,
      redirect: item.redirect || undefined,
      children: [] as NavMenu
    }
    // 是否设置了隐藏菜单
    if (show === false) {
      currentRouter.hidden = true
    }
    // 是否设置了隐藏子菜单
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    // item.redirect && (currentRouter.redirect = item.redirect!)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children as DeepRequired<NavItem>[], currentRouter)
    }
    // 如果有子路由，设置redirect为第一个子路由
    if (currentRouter.children.length > 0) {
      const firstChild = currentRouter.children[0];
      currentRouter.redirect = firstChild.redirect || firstChild.path;
    } else {
      currentRouter.redirect = undefined
    }
    return currentRouter
  })
}

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list: NavMenu, tree: NavItem[], parentId: number) => {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      } as NavItem & { children?: NavItem[] }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children!, item.id!)
      // 只有当有子菜单时才添加 children 属性
      if (child.children && child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}