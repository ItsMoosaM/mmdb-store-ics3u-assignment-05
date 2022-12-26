import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import LoginPage from "../views/LoginPage.vue";
import Trending from "../views/Trending.vue";
import TopRated from "../views/TopRated.vue";
import Cart from "../views/Cart.vue";
import About from "../views/About.vue";
import Search from "../views/Search.vue";

const router = createRouter({
  history: createWebHistory('/mmdb-store-ics3u-assignment-05/'),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/trending',
      component: Trending
    },    {
      path: '/toprated',
      component: TopRated
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/search',
      component: Search
    }
  ],
});

export default router;