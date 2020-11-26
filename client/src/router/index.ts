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
import Categories from "../views/Categories.vue";
import { auth } from "../config/firebase";

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
    path: "/categories",
    name: "Categories",
    component: Categories
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
    path: "/watchlist",
    name: "WatchList",
    component: WatchList,
    meta: {
      // requiresAuth: true
    }
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
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  //To the top of the page always
  window.scrollTo(0, 0);

  //Auth
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  //If no access to page, redirect to login
  if (requiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
