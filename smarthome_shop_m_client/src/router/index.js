// import { from } from 'core-js/core/array'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('@/views/List.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/Order/order.vue')
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('@/views/Payment/payment.vue')
  },
  {

    path: '/user',
    name: 'User',
    children: [
      {
        path: "/user",
        name: "My",
        component: () => import("@/views/user/My.vue")
      },
      {
        path: "/user/setting",
        name: "Setting",
        component: () => import("@/views/user/Setting.vue")
      },
    ],
    component: () => import('@/views/user/User.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/Register.vue')
  },
  {
    path: '/search',
    name: 'Search',
    children: [
      {
        path: "/",
        name: "Index",
        component: () => import("@/views/search/search-history.vue")
      },
      {
        path: "list",
        name: "sList",
        component: () => import("@/views/search/search-list.vue")
      }
    ],
    component: () => import('@/views/search/Search.vue')
  },
  {
    path: '/goodsdetail',
    name: 'Goodsdetail',
    meta: {
      keepAlive: true,
    },
    component: () => import('@/views/Goodsdetail.vue')
  },
  {

  path: '/address',
    name: 'Address',
    children: [
      {
        path: "/address",
        name: "Addresslist",
        component: () => import("@/views/Address/AddressList.vue")
      },
      {
        path: "/address/addaddress",
        name: "Addaddress",
        component: () => import("@/views/Address/Addaddress.vue")
      },
      {
        path: "/address/editaddress",
        name: "Editaddress",
        component: () => import("@/views/Address/Editaddress.vue")
      },
    ],
    component: () => import("@/views/Address/Address.vue")

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  const {profile} = store.state.user;
  let nextRoute=['Order','Payment'];
  console.log('nextRoute.indexOf(to.name): ', nextRoute.indexOf(to.name));

  // console.log('profile: ', profile);
  if (!profile.token&&(to.path.startsWith('/address')||nextRoute.indexOf(to.name)>=0)){

    return next('/login')
  }
  next()

})


export default router
