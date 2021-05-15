import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from "../views/HomePage";
import ProductDetail from "../views/ProductDetail";
import Login from "../views/Login";

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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
