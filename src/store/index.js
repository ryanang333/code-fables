import { createStore } from "vuex";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import db from "../firebase/init";
import createPersistedState from "vuex-persistedstate";
export default createStore({
  plugins: [
    createPersistedState({
      key: "my-vuex-state",
      paths: ["dataOfUser"],
      storage: window.localStorage,
    }),
  ],
  state: {
    dataOfUser: {
      exp: 0,
      friend_requests: [],
      friends: [],
      level: 0,
      password: "",
      profile_name: "",
      profile_pic_ID: "",
      skin_ID: "",
      username: "",
    },
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.dataOfUser = userData;
      console.log(state.dataOfUser);
    },
  },
  actions: {
    //create a function here that immediately populates all the dataOfUser the moment
    //they are authenticated and enters the application.
    async setUserData({ commit }, data) {
      commit("SET_USER_DATA", data);
    },
    async fetchData(_, { collection, documentKey }) {
      const docSnap = await getDoc(doc(db, collection, documentKey));
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    },
    async updateData(_, { collection, documentKey, payload }) {
      await updateDoc(doc(db, collection, documentKey), payload);
    },
  },

  

  modules: {},

  getters: {
    getUserData: (state) => {
      return state.dataOfUser;
    },
  },
});
