// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
// import VueRouter from 'vue-router'
import router from './router'
import App from './App'
import Vuex from 'vuex'
import axios from 'axios';

Vue.prototype.$http = axios

import  { LoadingPlugin ,AlertPlugin,ToastPlugin} from 'vux'
// 记住用之前要先注册
Vue.use(Vuex)
Vue.use(LoadingPlugin)//用 Alert 也需要同时在全局注册一个LoadingPlugin
Vue.use(AlertPlugin)//用 Alert 也需要同时在全局注册一个AlertPlugin
Vue.use(ToastPlugin)
/*默认进入的页面*/
// Vue.use(VueRouter)

// const routes = [{
//   path: '/',
//   component: NewCon默认进入的页面
// }]

// const router = new VueRouter({
//   routes
// })

FastClick.attach(document.body)

Vue.config.productionTip = false
// Vue.component("Actionsheet", VuxActionsheet); 
const store = new Vuex.Store({
	state:{
		isOk:false,
		isLoading:false
	},
	mutations:{
		showMessOk(state , value){
			state.isOk=value.isOk
		},
		showMessLoading(state , value){
			state.isLoading=value.isLoading
		}
	}
})
router.beforeEach((to,from,next)=>{
    let inRul= to.matched[0].path.split('/')[1]
    if(inRul=='NewCon'){
      console.log(222)
    }else{
    	setTimeout(function(){
    	  console.log('异步提交之前'+store.state.isLoading)
   	      	store.commit({type:'showMessLoading',isLoading:false})
	      console.log('异步提交之后'+store.state.isLoading)
	     },500)
    }
    next();
});
router.afterEach((to)=>{
	store.commit({type:'showMessLoading',isLoading:false})
})
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app-box')
