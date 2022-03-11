import Vue from 'vue'
import Vuex from 'vuex'
// 三个模块
import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'
import address from './modules/address'
import order from './modules/order'
// 数据持久化
import createPersistedstate from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    cart,
    user,
    category,
    address,
    order
  },
  plugins: [
    createPersistedstate({
      key: 'smarthome_shop_m_client-store',
      paths: ['user', 'cart','address','order']
    })
  ]
})
