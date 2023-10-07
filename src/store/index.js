import { createStore } from 'vuex';
import { getDoc, doc } from "firebase/firestore";
import db from "../firebase/init";
export default createStore({
    state: {
        user_data : {
            username: '',
            profile_name: '',
            level: '',
            experience: '',
            profile_pic_ID: '',
            friends: '',
            friend_requests: '',
        }
    },
    mutations: {

    },
    actions: {
    //create a function here that immediately populates all the user_data the moment
    //they are authenticated and enters the application.

    async fetchData(_, { collection, documentKey }) {
        const docSnap = await getDoc(doc(db, collection, documentKey ));
        if (docSnap.exists()){
            return docSnap.data();
        }else{
            return null;
        }
      },
    }, 
    modules: {

    }
})
