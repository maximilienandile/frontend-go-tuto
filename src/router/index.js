import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from "../views/HomePage";
import ProductDetail from "../views/ProductDetail";
import Login from "../views/Login";
import Cart from "../views/Cart";
import Success from "../views/Success";
import ProductsByCategory from "../views/ProductsByCategory";

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
    path: '/products/category/:categoryId',
    name: 'ProductByCategory',
    component: ProductsByCategory,
    props: route =>({ categoryId: route.params.categoryId})
  },
  {
    path: '/login',
    name: 'LoginRoute',
    component: Login,
  },
  {
    path: '/cart',
    name: 'CartRoute',
    component: Cart,
  },
  {
    path: '/success',
    name: 'Success',
    component: Success,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
