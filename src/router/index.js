import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from "../views/HomePage";
import ProductDetail from "../views/ProductDetail";
import Login from "../views/Login";
import Checkout from "../views/Checkout";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/product/:productId',
    name: 'ProductDetailRoute',
    component: ProductDetail,
    props: route =>({ productId: route.params.productId})
  },
  {
    path: '/login',
    name: 'LoginRoute',
    component: Login,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function (user) {
      console.log(user)
      if (user) {
        next()
      } else {
        // no user go to the login
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
});




export default router
