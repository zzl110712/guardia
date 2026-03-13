// 存储类型
type StorageType = 'localStorage' | 'sessionStorage'

// 存储项接口
interface StorageItem {
  value: any
  expiry: number | null
}

/**
 * 存储工具类
 * 支持 localStorage 和 sessionStorage，具备设置存储数据有效期的功能
 */
export class StorageUtil {
  private storage: Storage
  private prefix: string

  /**
   * 构造函数
   * @param type 存储类型，默认为 localStorage
   * @param prefix 存储键前缀，默认为 'app_'
   */
  constructor(type: StorageType = 'localStorage', prefix: string = 'app_') {
    this.storage = type === 'localStorage' ? window.localStorage : window.sessionStorage
    this.prefix = prefix
  }

  /**
   * 存储数据
   * @param key 存储键
   * @param value 存储值
   * @param expiry 过期时间（毫秒），null 表示永不过期
   */
  set(key: string, value: any, expiry: number | null = null): void {
    const item: StorageItem = {
      value,
      expiry: expiry ? Date.now() + expiry : null
    }
    this.storage.setItem(this.prefix + key, JSON.stringify(item))
  }

  /**
   * 获取数据
   * @param key 存储键
   * @returns 存储的值，如果已过期或不存在则返回 null
   */
  get<T = any>(key: string): T | null {
    const itemStr = this.storage.getItem(this.prefix + key)
    
    if (!itemStr) {
      return null
    }

    try {
      const item: StorageItem = JSON.parse(itemStr)
      
      // 检查是否过期
      if (item.expiry && Date.now() > item.expiry) {
        this.remove(key)
        return null
      }

      return item.value as T
    } catch (error) {
      // 解析失败，可能是旧数据格式
      this.remove(key)
      return null
    }
  }

  /**
   * 移除数据
   * @param key 存储键
   */
  remove(key: string): void {
    this.storage.removeItem(this.prefix + key)
  }

  /**
   * 清空所有存储
   */
  clear(): void {
    this.storage.clear()
  }

  /**
   * 获取所有键
   * @returns 所有存储键的数组
   */
  keys(): string[] {
    const keys: string[] = []
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i)
      if (key && key.startsWith(this.prefix)) {
        keys.push(key.replace(this.prefix, ''))
      }
    }
    return keys
  }

  /**
   * 检查键是否存在
   * @param key 存储键
   * @returns 是否存在且未过期
   */
  has(key: string): boolean {
    return this.get(key) !== null
  }
}

// 创建默认实例
export const localStorage = new StorageUtil('localStorage')
export const sessionStorage = new StorageUtil('sessionStorage')

// 存储键常量
export const STORAGE_KEYS = {
  TOKEN: 'token'
}

export default StorageUtil
