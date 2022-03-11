import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/common.css'
import './assets/css/iconfont.css'

import './assets/js/flexible.js'
//插件
import LyTab from 'ly-tab'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Lazyload } from 'mint-ui';
// import { Lazyload } from 'vant';
//import VueAwesomeSwiper from 'vue-awesome-swiper'
//import 'swiper/dist/css/swiper.css'
// import Vant,{Lazyload} from 'vant';
// import 'vant/lib/index.css';

// import { TreeSelect } from 'vant';
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(
      LyTab,
      Mint,
    )

Vue.use(Lazyload);
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  

  render: h => h(App)
}).$mount('#app')
