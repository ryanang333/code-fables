<template>
  <button type="button" id="switch" class="btn btn-success submit" @click="friendBool">Switch to {{buttonTitle}}</button>
  
  <div class="container-fluid bg-image">
  <div class="container-fluid bg-overlay">
  
  <div class="container mt-5 podium-div" v-if="leaderboardPodium.length == 3">
    <h2 class="text-center"><img src="src\assets\images\friends-leaderboard.png" v-if="friendsBool == true"></h2>
    <h2 class="text-center"><img src="src\assets\images\global-leaderboard.png" v-if="friendsBool == false"></h2>
    <div class="mt-4 row justify-content-center">
      <div class="col-3 mt-5 text-center">
        <img class="podium" src="src\assets\images\king.png" />
        <div
          class=" card podiumBack shadow d-flex flex-direction-column justify-content-center align-items-center" v-bind:style="{ backgroundColor: leaderboardPodium[1].email==this.myUser ? 'lightgoldenrodyellow' : '#C0C0C0' }"
        >
          <img
            class="mt-4 podium mb-2"
            :src="leaderboardPodium[1].profile_pic_ID"
          />

          <p class="fw-bold">Level {{ leaderboardPodium[1].level }}</p>
          <p class="">EXP: {{ leaderboardPodium[1].exp }}</p>
          <p class="">{{ leaderboardPodium[1].profile_name }}</p>
        </div>
      </div>
      <div class="col-3 text-center podium-div">
        <img class="podium" src="src\assets\images\premium.png" />
        <div
          class=" card podiumBack shadow d-flex flex-direction-column justify-content-center align-items-center" v-bind:style="{ backgroundColor: leaderboardPodium[0].email==this.myUser ? 'lightgoldenrodyellow' : '#FFD700' }"
        >
          <img
            class="mt-4 podium mb-2"
            :src="leaderboardPodium[0].profile_pic_ID"
          />
          <p class="fw-bold">Level {{ leaderboardPodium[0].level }}</p>
          <p>EXP: {{ leaderboardPodium[0].exp }}</p>
          <p>{{ leaderboardPodium[0].profile_name }}</p>
        </div>
      </div>
      <div class="col-3 mt-5 text-center podium-div">
        <img class="podium" src="src\assets\images\crown.png" />
        <div
          class=" card podiumBack shadow d-flex flex-direction-column justify-content-center align-items-center"  v-bind:style="{ backgroundColor: leaderboardPodium[2].email==this.myUser ? 'lightgoldenrodyellow' : '#B87333' }"
        >
          <img
            class="mt-4 podium mb-2"
            :src="leaderboardPodium[2].profile_pic_ID"
          />
          <p class="fw-bold">Level {{ leaderboardPodium[2].level }}</p>
          <p>EXP: {{ leaderboardPodium[2].exp }}</p>
          <p>{{ leaderboardPodium[2].profile_name }}</p>
        </div>
      </div>
    </div>
    <br />
    <hr />
  </div>
  <div class="container mt-5">
    <div
      class="padding-5"
      v-for="(person, index) in leaderboardList"
      :key="person.profile_name"
    >
      <div
        class="row listItem d-flex mb-4 align-items-center rounded-3 px-3 pt-3 d-flex-row" v-bind:style="{ backgroundColor: person.email==this.myUser ? 'lightgoldenrodyellow' : '#cdbea2' }"
      >
        <div class="col-1 mb-3 me-4">
          <h2>{{ index + 4 }}</h2>
        </div>
        <div
          class="col-2 justify-content-center d-flex flex-column align-items-center"
        >
          <img class="podium" :src="person.profile_pic_ID" />
          <p class="fw-bold text-center">Level {{ person.level }}</p>
        </div>
        <div class="col-6 mb-3 text-center">
          <h2>{{ person.profile_name }}</h2>
        </div>
        <div class="col mb-3">
          <h3>{{ person.exp }}xp</h3>
        </div>
      </div>
    </div>
  </div>
</div>
</div>  
</template>

<script>
import { getAuth } from "firebase/auth";
import db from "../../firebase/init";
import { getDocs, query, collection, orderBy,getDoc, doc } from "firebase/firestore";
export default {
  name: "Leaderboard",
  components: {},
  data() {
    return {
      UID: "",
      isUser: true,
      myUser: "",
      myUsername: "",
      boardTitle: "Global Leaderboard",
      buttonTitle: "Friends",
      friendsBool: false,
      leaderboardPodium: [],
      leaderboardList: [],
      friendLeaderboardPodium: [],
      friendLeaderboardList: [],
    };
  },
  methods: {
    async friendBool() {
      if (this.friendsBool == true){
        this.friendsBool = false
        this.boardTitle = "Global Leaderboard"
        this.buttonTitle = "Friends"
        this.getAllUsers()
        //change button property
      }
      else{
        this.boardTitle = "Friend Leaderboard"
        this.buttonTitle = "Global"
        this.friendsBool = true
        this.getAllFriends()
        //change button property
      }
    },
    async getAllUsers() {
      this.leaderboardPodium = []
      this.leaderboardList = []
      const q = query(collection(db, "accounts"), orderBy("exp", "desc"));
      const querySnap = await getDocs(q);
      var count = 0;
      querySnap.forEach((doc) => {
        count += 1;
        if (count <= 3) {
          this.leaderboardPodium.push(doc.data());
          
        } else {
          this.leaderboardList.push(doc.data());
        }
      });
    },
    async getAllFriends() {
      this.leaderboardPodium = []
      this.leaderboardList = []
      const docSnap = await getDoc(doc(db, 'accounts', this.UID));
      var friendsList = docSnap.data().friends
      friendsList.push(this.myUser)

    //   for (let friend of friends){
    //     const docSnap = await getDoc(doc(db, 'user_profiles', friend));
    //     const docSnap2 = await getDoc(doc(db, 'accounts', docSnap.data().uid ));
    //     friendsList.push(docSnap2.data().profile_name);      
    //     console.log(docSnap2.data().profile_name)
    // }

    const q = query(collection(db, "accounts"), orderBy("exp", "desc"));
      const querySnap = await getDocs(q);
      var count2 = 0;
      querySnap.forEach((doc) => {
        
        if (count2 < 3 && friendsList.includes(doc.data().email)) {
          count2 += 1;
          this.leaderboardPodium.push(doc.data());
  
        } 
        
        else if (friendsList.includes(doc.data().email)) {
          count2 += 1;
          this.leaderboardList.push(doc.data());

        } 
        
  
      });
    },
  },
  mounted() {
    this.UID = getAuth().currentUser.uid;
    this.myUser = getAuth().currentUser.email;
    this.getAllUsers();
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}

.bg-image {
  background-image: url("/src/assets/images/background3.png");
  background-attachment: fixed;
  background-size: cover; /* Optional: Scales the background image to cover the entire container */
  background-position: center;
  background-color: black;
  padding: 0px;
}

.bg-overlay {
  content: "";
  padding: 10px;
  background: rgba(0, 0, 0, 0.651);
  background-size: cover; 
  z-index: 0;
}

#switch{
  width: 100%;
  border-radius: 0px;
  position: sticky;
  top: 65px; 
  z-index: 1;
  /* need to fix the sticky top */
}

.listItem{
  border: #7e6e5c solid 5px;
}

.user{
  background-color: orange;
}

.nonuser{
  background-color: grey;
}
.podium {
  width: 100px;
  height: auto;
}

.podiumBack {
  border-radius: 50%;
}

.podium-div p {
  margin-top: -8px;

}
</style>
