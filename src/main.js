import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'components/common/toast' //引入自己封装的吐司插件 index.js
import FastClick from 'fastclick' //解决300ms延迟，安装，引入，使用

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() //事件总线

Vue.use(Toast) //使用

FastClick.attach(document.body) //FastClick的使用

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')