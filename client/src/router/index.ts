import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Catalog from "../views/Catalog.vue";
import DetailsPage from "../views/DetailsPage.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import WatchList from "../views/WatchList.vue";
import RandomMovie from "../views/RandomMovie.vue";
import Sitemap from "../views/Sitemap.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/catalog",
    name: "Catalog",
    component: Catalog
  },
  {
    path: "/catalog/:id",
    name: "DetailsPage",
    component: DetailsPage
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignUp
  },
  {
    path: "/watchlist/:id",
    name: "WatchList",
    component: WatchList
  },
  {
    path: "/random",
    name: "RandomMovie",
    component: RandomMovie
  },
  {
    path: "/sitemap",
    name: "Sitemap",
    component: Sitemap
  },
  {
    path: "*",
    redirect: "/"
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  routes
});

export default router;
