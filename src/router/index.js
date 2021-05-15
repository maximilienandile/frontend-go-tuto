import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from "../views/HomePage";
import ProductDetail from "../views/ProductDetail";

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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
