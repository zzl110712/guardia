/**
 * 深度克隆函数，实现 lodash.cloneDeep 的功能
 * @param value 要克隆的值
 * @returns 克隆后的新值
 */
export function cloneDeep<T>(value: T): T {
  // 处理基本类型（string, number, boolean, null, undefined, symbol, bigint）
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // 处理循环引用
  const clonedMap = new WeakMap();

  function _cloneDeep<T>(value: T): T {
    // 基本类型直接返回
    if (value === null || typeof value !== 'object') {
      return value;
    }

    // 检查循环引用
    if (clonedMap.has(value as object)) {
      return clonedMap.get(value as object) as T;
    }

    // 处理数组
    if (Array.isArray(value)) {
      const clonedArray = [] as T;
      clonedMap.set(value as object, clonedArray);
      for (let i = 0; i < value.length; i++) {
        (clonedArray as any)[i] = _cloneDeep(value[i]);
      }
      return clonedArray;
    }

    // 处理 Date
    if (value instanceof Date) {
      const clonedDate = new Date(value.getTime()) as T;
      clonedMap.set(value, clonedDate);
      return clonedDate;
    }

    // 处理 RegExp
    if (value instanceof RegExp) {
      const clonedRegExp = new RegExp(value.source, value.flags) as T;
      clonedMap.set(value, clonedRegExp);
      return clonedRegExp;
    }

    // 处理对象
    if (typeof value === 'object') {
      const clonedObject = {} as T;
      clonedMap.set(value as object, clonedObject);
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          (clonedObject as any)[key] = _cloneDeep((value as any)[key]);
        }
      }
      return clonedObject;
    }

    // 其他类型直接返回
    return value;
  }

  return _cloneDeep(value);
}