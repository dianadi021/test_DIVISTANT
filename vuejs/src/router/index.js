import Auth from "../modular/tools/Auth.js";
const { CheckTokenJWT, RemoveTokenJWT } = new Auth();

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Welcome.vue";

const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL),
 routes: [
  {
   path: "/:pathMatch(.*)*",
   name: "NotFound",
   component: () => import("../views/NotFound.vue"),
  },
  {
   path: "/",
   name: "home",
   component: HomeView,
  },
  {
   path: "/dashboard",
   name: "dashboard",
   component: () => import("../views/Dashboard.vue"),
   beforeEnter: (to, from, next) => {
    if (CheckTokenJWT()) {
     next();
    } else {
     next("/");
    }
   },
  },
  {
   path: "/book/detail",
   name: "book.detail",
   component: () => import("../views/Book.vue"),
   beforeEnter: (to, from, next) => {
    if (CheckTokenJWT()) {
     next();
    } else {
     next("/dashboard");
    }
   },
  },
  {
   path: "/logout",
   name: "logout",
   component: () => import("../components/partials/Logout.vue"),
   beforeEnter: (to, from, next) => {
    if (CheckTokenJWT()) {
     next();
    } else {
     next("/dashboard");
    }
   },
  },
 ],
});

export default router;
