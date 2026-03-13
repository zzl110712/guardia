# Vue3 + TypeScript + AntD-Vue 示例项目

## 项目介绍

这是一个使用 Vue3、TypeScript 和 AntD-Vue 构建的现代化前端项目，展示了如何在企业级应用中集成这些技术栈。项目包含了完整的用户认证、动态路由、权限管理、布局系统等企业级功能，可作为学习和开发的起点。

## 所需环境

- Node.js: v18.0.0 或更高版本
- npm: v9.0.0 或更高版本

## 目录结构

```
├── public/              # 静态资源目录
├── src/                 # 源代码目录
│   ├── api/             # API 接口定义
│   │   └── index.ts     # 接口请求和类型定义
│   ├── composables/     # 组合式函数
│   │   └── useRouteHelpers.ts  # 路由辅助函数
│   ├── config/          # 配置文件
│   │   └── router.config.ts    # 路由配置
│   ├── layouts/         # 布局组件
│   │   ├── components/  # 布局子组件
│   │   │   ├── Content.vue     # 内容区域组件
│   │   │   ├── Footer.vue      # 页脚组件
│   │   │   ├── Header.vue      # 顶部导航组件
│   │   │   └── SideMenu.vue    # 侧边菜单组件
│   │   ├── BasicLayout.vue     # 基础布局组件
│   │   ├── RouteView.vue       # 路由视图组件
│   │   └── withLayout.ts       # 布局高阶函数
│   ├── router/          # 路由配置
│   │   ├── generator-routers.ts # 动态路由生成器
│   │   └── index.ts     # 路由初始化
│   ├── store/           # 状态管理 (Pinia)
│   │   ├── async-router.ts     # 异步路由状态
│   │   ├── index.ts            # Store 入口
│   │   ├── static-router.ts    # 静态路由状态
│   │   └── user.ts             # 用户状态
│   ├── utils/           # 工具函数
│   │   ├── index.ts            # 通用工具
│   │   ├── permission.ts       # 权限控制
│   │   ├── request.ts          # HTTP 请求封装
│   │   └── storage.ts          # 本地存储封装
│   ├── views/           # 页面视图
│   │   ├── dashboard/          # 仪表盘页面
│   │   ├── 404.vue             # 404页面
│   │   ├── About.vue           # 关于页面
│   │   ├── Contact.vue         # 联系页面
│   │   └── Login.vue           # 登录页面
│   ├── App.vue          # 主应用组件
│   ├── main.ts          # 应用入口文件
│   └── vite-env.d.ts    # Vite 环境类型声明
├── index.html           # HTML 入口文件
├── package.json         # 项目配置和依赖
├── tsconfig.json        # TypeScript 配置
├── tsconfig.node.json   # Node 环境 TypeScript 配置
├── vite.config.ts       # Vite 配置
└── README.md            # 项目说明文件
```

## 安装依赖

```bash
npm install
```

## 开发模式运行

```bash
npm run dev
# 或
npm start
```

## 构建生产版本

```bash
npm run build
```

## 预览生产构建

```bash
npm run preview
```

## 技术栈

- **Vue 3.4**: 最新版本的 Vue 框架，使用 Composition API
- **TypeScript 5**: 提供类型安全的 JavaScript 超集
- **AntD-Vue 4**: 基于 Ant Design 的 Vue UI 组件库
- **Vue Router 4**: 官方路由管理器，支持动态路由
- **Pinia 3**: 轻量级状态管理库，Vuex 的替代品
- **Vite 5**: 现代化的前端构建工具
- **Axios**: HTTP 客户端库

## 项目特点

### 1. 企业级架构设计
- 模块化目录结构，代码组织清晰
- 组件化开发，提高代码复用性
- 类型安全的 TypeScript 支持

### 2. 完整的用户认证系统
- 登录/登出功能
- Token 认证机制
- 用户信息管理
- 权限控制

### 3. 动态路由系统
- 基于权限的动态路由生成
- 菜单与路由联动
- 路由守卫实现权限控制
- 支持嵌套路由和重定向

### 4. 响应式布局系统
- 侧边栏菜单（可折叠）
- 顶部导航栏
- 面包屑导航
- 用户头像和下拉菜单
- 移动端适配

### 5. 状态管理
- 使用 Pinia 进行状态管理
- 用户状态、路由状态分离
- 支持状态持久化

### 6. 代码质量
- ESLint 代码规范
- TypeScript 类型检查
- 组件使用 `markRaw` 优化性能
- 响应式对象优化

### 7. 开发体验
- Vite 快速热更新
- 详细的代码注释
- 类型定义完善
- 错误处理和日志记录

## 核心功能说明

### 动态路由生成
项目实现了基于后端权限数据的动态路由生成系统：
- `generator-routers.ts`: 路由生成器，将菜单数据转换为 Vue Router 配置
- `async-router.ts`: 异步路由状态管理
- `permission.ts`: 路由守卫，控制访问权限

### 布局系统
采用经典的侧边栏 + 顶部导航布局：
- `BasicLayout.vue`: 基础布局，包含侧边栏和主内容区
- `SideMenu.vue`: 侧边菜单组件
- `Header.vue`: 顶部导航组件
- `Content.vue`: 内容区域组件
- `Footer.vue`: 页脚组件

### 权限控制
实现了基于角色的权限控制系统：
- 路由级别权限控制
- 菜单级别权限控制
- 页面元素权限控制（可扩展）

### 数据请求
封装了 Axios HTTP 客户端：
- 请求/响应拦截器
- 错误统一处理
- Token 自动注入
- 类型安全的 API 定义

## 注意事项

1. **Node.js 版本**: 项目需要 Node.js v18.0.0 或更高版本
2. **AntD-Vue 版本**: 使用 v4 版本，与 v3 版本有 API 差异
3. **Vue Router 4**: 动态路由和路由守卫的使用方式与 v3 不同
4. **组件性能**: 使用 `markRaw` 标记组件，避免不必要的响应式转换
5. **类型安全**: 项目使用 TypeScript 严格模式，确保类型安全

## 开发建议

1. **组件开发**: 使用 Composition API 和 `<script setup>` 语法
2. **状态管理**: 使用 Pinia 进行状态管理，避免直接修改状态
3. **路由配置**: 在 `router.config.ts` 中配置路由，保持路由配置集中管理
4. **API 定义**: 在 `api/index.ts` 中定义接口类型和请求函数
5. **工具函数**: 在 `utils` 目录中封装通用工具函数

## 更新日志

## 许可证

MIT License
