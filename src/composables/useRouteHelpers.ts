import { computed } from 'vue'
import { useRoute } from 'vue-router'

/**
 * 路由相关的辅助函数
 */
export function useRouteHelpers() {
  const route = useRoute()

  /**
   * 获取当前路由路径
   */
  const currentRoute = computed(() => {
    return route.path
  })

  /**
   * 将路径转换为包含所有父级路径的数组
   * @param path 输入路径，如 '/dashboard/workplace'
   * @returns 路径数组，如 ['/dashboard', '/dashboard/workplace']
   */
  const getPathArray = (path: string): string[] => {
    // 分割路径并过滤空字符串
    const parts = path.split('/').filter(Boolean);
    const result: string[] = [];
    let currentPath = '';

    // 逐步构建每个路径
    for (const part of parts) {
      currentPath += `/${part}`;
      result.push(currentPath);
    }
    
    return result;
  }

  /**
   * 获取当前路由的父路径数组，用于展开菜单
   */
  const currentPathArray = computed(() => {
    return getPathArray(route.path)
  })

  return {
    route,
    currentRoute,
    getPathArray,
    currentPathArray
  }
}
