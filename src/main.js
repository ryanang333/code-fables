import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Account from "./components/Account/Account.vue";
import Login from "./components/Login/Login.vue";
import Social from "./views/Social.vue";
import Homepage from "./components/Homepage/Homepage.vue";
import GameCode from "./views/GameCode.vue";

const routes = [
  { path: "/", component: Homepage },
  { path: "/account", component: Account },
  { path: "/gamecode", component: GameCode },
  { path: "/login", component: Login },
  { path: "/social", component: Social },

  //Catch-all route to redirect to homepage. LEAVE THIS AT THE LAST
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

//Route guard to protect authenticated routes
//Implement after user authentication is set up
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.isAuthenticated) {
      // User is authenticated, allow access
      next();
    } else {
      // User is not authenticated, redirect to the login page
      next("/login");
    }
  } else {
    // For public routes, allow access
    next();
  }
});
createApp(App).use(router).mount("#app");
