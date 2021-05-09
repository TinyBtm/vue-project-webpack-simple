import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index/index.vue";

const draglist = () => import("@/views/data/draglist.vue");
// 解决vue-router使用push方法重复触发会报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);
/*
 * 首页需快速展示
 * 子页可延后展示
 * */
const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/draglist",
    name: "draglist",
    component: draglist,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
