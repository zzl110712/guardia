import { defineComponent, h, defineAsyncComponent } from "vue";
import BasicLayout from "./BasicLayout.vue";

// 如果使用import动态引入组件Component就是一个Promise方法，需要用defineAsyncComponent解析组件
export function withLayout(Component: any) {
  // 检查Component是否是一个函数，如果是，则可能是动态导入
  const TargetComponent = typeof Component === 'function'
    ? defineAsyncComponent(Component)
    : Component;

  return defineComponent({
    render() {
      return h(BasicLayout, {}, {
        default: () => h(TargetComponent)
      })
    }
  })
}