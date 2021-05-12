import Vue from "vue";
import VueResource from "vue-resource";
import ElementUI from "element-ui";
import router from "./router";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/font/iconfont.css";
import App from "./App";

Vue.productionTip = false;
Vue.use(VueResource);
Vue.use(ElementUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
