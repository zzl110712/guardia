import { ref } from 'vue'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { message } from 'ant-design-vue'
import { localStorage, STORAGE_KEYS } from '@/utils/storage'

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Cache-Control': 'no-cache'
  }
})

// 请求队列
export let pendingRequests = ref(0)

// 存储 token 缓存，避免每次请求都从 storage 读取
let tokenCache: string | null = null

// 初始化 token 缓存
const initTokenCache = () => {
  if (!tokenCache) {
    tokenCache = localStorage.get<string>(STORAGE_KEYS.TOKEN)
  }
}

// 初始化 token 缓存
initTokenCache()

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    pendingRequests.value++
    
    // 从缓存获取 token，如果缓存为空则从 storage 读取
    if (!tokenCache) {
      initTokenCache()
    }
    
    if (tokenCache) {
      config.headers.Authorization = `Bearer ${tokenCache}`
    }
    
    return config
  },
  (error) => {
    pendingRequests.value--
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    pendingRequests.value--
    
    const { data } = response
    
    // 根据业务状态码处理
    if (data.code === 200 || data.success) {
      return data
    }
    
    // 处理业务错误
    message.error(data.message || '请求失败')
    return Promise.reject(new Error(data.message || '请求失败'))
  },
  (error: AxiosError) => {
    pendingRequests.value--
    
    // 处理 HTTP 错误
    const status = error.response?.status
    
    switch (status) {
      case 401:
        message.error('登录已过期，请重新登录')
        localStorage.remove(STORAGE_KEYS.TOKEN)
        tokenCache = null
        window.location.href = '/login'
        break
      case 403:
        message.error('没有权限访问该资源')
        break
      case 404:
        message.error('请求的资源不存在')
        break
      case 500:
        message.error('服务器错误，请稍后重试')
        break
      default:
        message.error(error.message || '网络错误，请检查网络连接')
    }
    
    return Promise.reject(error)
  }
)

// 扩展 AxiosRequestConfig 类型
export interface RequestConfig extends AxiosRequestConfig {
  skipErrorHandler?: boolean
}

// 封装请求方法
const request = {
  get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return service.get(url, config)
  },
  
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.post(url, data, config)
  },
  
  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.put(url, data, config)
  },
  
  delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return service.delete(url, config)
  },
  
  patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.patch(url, data, config)
  },
  
  // 上传文件
  upload<T = any>(url: string, formData: FormData, config?: RequestConfig): Promise<T> {
    return service.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  
  // 下载文件
  download(url: string, config?: RequestConfig): Promise<Blob> {
    return service.get(url, {
      ...config,
      responseType: 'blob'
    })
  }
}

export default request
