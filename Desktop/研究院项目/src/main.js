import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
import '@/styles/iconfont.css'

// import iView from 'iview'
// import 'iview/dist/styles/iview.css'

// Vue.use(iView)

import 'babel-polyfill' // 兼容IE需要的
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import '@/icons' // icon
import '@/permission' // permission control

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'IeX6XuQlGoYt3kfH4uQNxGGHochpBIlr'
})
// 拖拽插件(需拖拽元素上绑定v-drag指令)
import vueDrag from 'vue-dragging'
Vue.use(vueDrag)

Vue.use(ElementUI, { locale })
Vue.use(VueResource)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
