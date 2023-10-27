import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Account from "./components/Account/Account.vue";
import Login from "./components/Login/Login.vue";
import Homepage from "./components/Homepage/Homepage.vue";
import GameCode from "./views/GameCode.vue";
import FriendsList from "./components/FriendsList/FriendsList.vue";
import Leaderboard from "./components/Leaderboard/Leaderboard.vue";
import "./firebase/listeners/firestoreListeners";
import Register from "./components/Login/Register.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ModelRender from "./components/ModelRender/ModelRender.vue";
import CustomisationScreen from "./components/Login/CustomisationScreen.vue";
import Codingquestion from "./components/Game/Codingquestion.vue";
import TopicList from "./components/Game/TopicList.vue"; 

const routes = [
  {
    path: "/modelRender",
    component: ModelRender,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/account",
    component: Account,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/gamecode",
    component: GameCode,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/myfriends",
    component: FriendsList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/leaderboard",
    component: Leaderboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/character",
    component: CustomisationScreen,
    meta: {
      requiresAuth: true,
    },
  },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  {
    path: "/codingquestion",
    component: Codingquestion,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/",
    component: TopicList,
    meta: {
      requiresAuth: true,
    },
  },
  //Catch-all route to redirect to homepage. LEAVE THIS AT THE LAST
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

createApp(App).use(router).mount("#app");
