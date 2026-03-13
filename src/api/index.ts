import request from '../utils/request'

// 接口响应类型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}

// 登录参数
export interface LoginParams {
  username: string
  password: string
  remember?: boolean
}

// 用户信息返回值
export interface UserInfo {
  // 用户唯一标识（字符串类型）
  id: string;
  // 用户名/昵称
  name: string;
  // 登录用户名
  username: string;
  // 密码（示例为空字符串，实际可能为 string | undefined）
  password: string;
  // 头像路径
  avatar: string;
  // 状态（1 通常表示启用，可扩展为联合类型：0 | 1 表示禁用/启用）
  status: number;
  // 手机号（示例为空字符串，可根据实际情况为 string | undefined）
  telephone?: string;
  // 最后登录 IP
  lastLoginIp?: string;
  // 最后登录时间（时间戳，毫秒级）
  lastLoginTime?: number;
  // 创建人 ID
  creatorId?: string;
  // 创建时间（时间戳，毫秒级）
  createTime?: number;
  // 商户编码
  merchantCode?: string;
  // 是否删除（0 表示未删除，可扩展为 0 | 1）
  deleted: number;
  // 角色 ID
  roleId: string;
  // 角色信息
  role: RoleInfo;
}

/**
* 角色信息类型
* 包含角色基础属性、状态、创建信息及关联的权限列表
*/
export interface RoleInfo {
 // 角色唯一标识（如 admin/editor 等）
 id: string;
 // 角色名称（中文展示名）
 name: string;
 // 角色描述
 describe: string;
 // 角色状态（1=启用，0=禁用，建议用联合类型提升类型校验）
 status: 0 | 1;
 // 创建人ID（如 system 表示系统内置）
 creatorId: string;
 // 创建时间（毫秒级时间戳）
 createTime: number;
 // 是否删除（0=未删除，1=已删除）
 deleted: 0 | 1;
 // 角色关联的权限列表（空数组，可适配之前定义的权限类型）
 permissions: RolePermission[];
 // 角色权限ID列表，用于快速权限检查
 permissionList?: string[];
}

/**
* 角色权限配置类型
* 包含角色ID、权限信息、操作列表等核心字段
*/ 
export interface RolePermission {
 // 角色ID
 roleId: string;
 // 权限ID（如仪表盘、用户管理等功能标识）
 permissionId: string;
 // 权限名称（中文展示名）
 permissionName: string;
 // 操作权限JSON字符串（注意：这里是序列化后的字符串，非对象）
 actions: string;
 // 操作权限实体列表（结构化的操作配置）
 actionEntitySet: ActionEntity[];
 // 操作列表（示例值为null，实际可能为字符串数组或null）
 actionList: string[] | null;
 // 数据权限（示例值为null，可根据实际业务扩展类型）
 dataAccess: null | Record<string, any>; // 若有数据权限结构，可替换为具体接口
}

/**
 * 操作权限实体类型
 * 描述单个操作（新增/查询/修改等）的配置
 */
interface ActionEntity {
  // 操作标识（如add/query/get/update/delete）
  action: string;
  // 操作描述（中文）
  describe: string;
  // 是否默认勾选
  defaultCheck: boolean;
}

/**
 * 导航菜单元信息类型
 */
interface MenuMeta {
  /** 菜单标题（国际化key） */
  title: string;
  /** 菜单图标（可选） */
  icon?: string;
  /** 是否显示该菜单 */
  show?: boolean;
  /** 跳转目标（如 '_blank'，可选） */
  target?: '_blank' | string;
  /** 是否隐藏头部内容（可选） */
  hiddenHeaderContent?: boolean;
  /** 是否隐藏子菜单（可选） */
  hideChildren?: boolean;
}

/**
 * 导航菜单项类型
 */
export interface NavItem {
  key?: string;
  children?: NavItem[];
  /** 菜单名称 */
  name: string;
  /** 父级ID */
  parentId?: number;
  /** 唯一ID */
  id?: number;
  /** 菜单元信息 */
  meta: MenuMeta;
  /** 组件名称（可选） */
  component: string;
  /** 重定向路径（可选） */
  redirect?: string;
  /** 路由路径（可选） */
  path: string;
}

/**
 * 导航菜单数组类型
 */
export type NavMenu = NavItem[];

/**
 * 登录接口
 * @param data 登录参数
 * @returns 登录成功后的 token
 */
export const login = (data: LoginParams) => {
  return request.post<ApiResponse<{ token: string }>>('/login', data)
}

/**
 * 获取用户信息接口
 * @returns 用户信息
 */
export const getUserInfo = () => {
  return request.get<ApiResponse<UserInfo>>('/user/info')
}

/**
 * 退出登录接口
 * @returns 退出成功
 */
export const logout = () => {
  return request.post<ApiResponse<{ success: boolean }>>('/logout')
}

/**
 * 获取动态路由权限接口
 * @returns 动态路由权限
 */
export const getCurrentUserNav = () => {
  return request.get<ApiResponse<NavMenu>>('/user/nav')
}
