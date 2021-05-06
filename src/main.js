import Vue from 'vue';
import router from './router';
import App from './App';

Vue.productionTip = false;

new Vue({
	router,
	render: h => h(App),
}).$mount('#app');