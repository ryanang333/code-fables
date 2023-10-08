import { createStore } from 'vuex';
import { getDoc, doc, updateDoc } from "firebase/firestore";
import db from "../firebase/init";

export default createStore({
    state: {
        user_data : {
            exp: 0,
            friend_requests: [],
            friends: [],
            level: 0,
            password: '',
            profile_name: '',
            profile_pic_ID: '',
            skin_ID: '',
            username: '',
        },
    },
    mutations: {
        SET_USER_DATA(state, userData){
            state.user_data = userData;
            console.log(state.user_data);
        }
    },
    actions: {
    //create a function here that immediately populates all the user_data the moment
    //they are authenticated and enters the application.
    async setUserData({ commit },  data){
        console.log("Setting user data:", data);
        commit("SET_USER_DATA", data);
      
    },
    async fetchData(_, { collection, documentKey }) {
        const docSnap = await getDoc(doc(db, collection, documentKey ));
        if (docSnap.exists()){
            return docSnap.data();
        }else{
            return null;
        }
      },
    }, 

    async updateData({ commit }, { collection, documentKey }) {
        await updateDoc(doc(db, collection, documentKey), )
    },
    
    modules: {

    },
    
    getters: {
        getUserData: (state) => {
            console.log(state);
            return state.user_data;
        }
    }
})
