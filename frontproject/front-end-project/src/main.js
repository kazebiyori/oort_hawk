import { createApp } from "vue";
import { store } from "@/store/index.js";

import App from "@/App.vue";
import router from "@/router/index.js";

// 使用viewUIPlus
// import ViewUIPlus from "view-ui-plus";
// import "view-ui-plus/dist/styles/viewuiplus.css";

// 导入样式
import "normalize.css/normalize.css";
// import "@/styles/index.scss"; // global css
// import "@/styles/element-variables.scss";

// 导入element图标资源
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 创建vue app
const app = createApp(App);

// 全局注册element图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 挂载路由
app.use(router);

// 挂载vuex状态
app.use(store);

// app.use(ViewUIPlus);

// 挂载vue app
app.mount("#app");
