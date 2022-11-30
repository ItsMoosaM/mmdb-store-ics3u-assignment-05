import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Store from "../views/Store.vue";
import Cart from "../views/Cart.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },    
    {
      path: '/store',
      component: Store
    },
    {
      path: '/cart',
      component: Cart
    },
  ],
});

export default router;