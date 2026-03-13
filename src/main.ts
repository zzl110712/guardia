import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import router from './router'
import pinia from './store'
import '@/utils/permission' // 导入路由守卫

const app = createApp(App)
app.use(Antd)
app.use(router)
app.use(pinia)
app.mount('#app')