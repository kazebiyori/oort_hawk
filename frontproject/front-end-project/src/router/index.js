import { createRouter, createWebHashHistory } from "vue-router";
import {
  Datastatistics,
  Datadisplay,
  Datacriterion,
  Criterionediting,
} from "@/views";

// 把组件名称改为首字母大写，为了让路由路径与组件名称之间对应关系方便用函数实现
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/datadisplay" },
    { path: "/datadisplay", component: Datadisplay },
    { path: "/datastatistics", component: Datastatistics },
    { path: "/datacriterion", component: Datacriterion },
    { path: "/criterionediting", component: Criterionediting },
  ],
});

export default router;
