<template>
  <div class="container-fluid bg-image">
  <div class="container-fluid bg-overlay">

    <div class="container my-5 ">
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <button @click="friendBool"
          class="nav-link active"
          id="nav-friends-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-friends"
          type="button"
          role="tab"
          aria-controls="nav-friends"
          aria-selected="true"
        >Global</button>
        <button @click="friendBool"
          class="nav-link"
          id="nav-leaderboard-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-leaderboard"
          type="button"
          role="tab"
          aria-controls="nav-leaderboard"
          aria-selected="false"
        >Friends</button>
      </div>
      
    </nav>
  </div>
  
  <div class="container mt-5 podium-div" v-if="leaderboardPodium.length == 3">
    <h2 class="text-center"><img class="w-100" src="src\assets\images\friends-leaderboard.png" v-if="friendsBool == true"></h2>
    <h2 class="text-center"><img class="w-100" src="src\assets\images\global-leaderboard.png" v-if="friendsBool == false"></h2>
    <div class="mt-4 row justify-content-center">
      <div class="col-lg-3 col-md-12 order-lg-1 order-2 mt-5 text-center">
        <img class="podium" src="src\assets\images\king.png" />
        <div
          class=" card podiumBack shadow d-flex flex-direction-column justify-content-center align-items-center" v-bind:style="{ backgroundColor: leaderboardPodium[1].email==this.myUser ? 'lightgoldenrodyellow' : '#C0C0C0' , borderColor : leaderboardPodium[1].email==this.myUser ? 'orange' : '#7e6e5c'  }"
        >
          <img
            class="mt-4 podium mb-2"
            :src="leaderboardPodium[1].profile_pic_ID"
          />
          <h3 class="fw-bold">{{ leaderboardPodium[1].profile_name }}</h3>
          <p class="fw-bold">Level {{ leaderboardPodium[1].level }}</p>
          <p class="">EXP: {{ leaderboardPodium[1].exp }}</p>
        </div>
      </div>
      <div class="col-lg-3 col-md-12 order-lg-2 order-1 text-center podium-div">
        <img class="podium" src="src\assets\images\premium.png" />
        <div
          class=" card podiumBack shadow d-flex flex-direction-column justify-content-center align-items-center" v-bind:style="{ backgroundColor: leaderboardPodium[0].email==this.myUser ? 'lightgoldenrodyellow' : '#FFD700' , borderColor : leaderboardPodium[0].email==this.myUser ? 'orange' : '#7e6e5c'  }"
        >
          <img
            class="mt-4 podium mb-2"
            :src="leaderboardPodium[0].profile_pic_ID"
          />
          <h3 class="fw-bold">{{ leaderboardPodium[0].profile_name }}</h3>
          <p class="fw-bold">Level {{ leaderboardPodium[0].level }}</p>
          <p>EXP: {{ leaderboardPodium[0].exp }}</p>

        </div>
      </div>
      <div class="col-lg-3 col-md-12 order-lg-3 order-3 mt-5 text-center podium-div">
        <img class="podium" src="src\assets\images\crown.png" />
        <div
          class=" card podiumBack shadow d-flex flex-direction-column justify-content-center align-items-center"  v-bind:style="{ backgroundColor: leaderboardPodium[2].email==this.myUser ? 'lightgoldenrodyellow' : '#B87333' , borderColor : leaderboardPodium[2].email==this.myUser ? '#09B051' : '#7e6e5c'  }"
        >
          <img
            class="mt-4 podium mb-2"
            :src="leaderboardPodium[2].profile_pic_ID"
          />
          <h3 class="fw-bold">{{ leaderboardPodium[2].profile_name }}</h3>
          <p class="fw-bold">Level {{ leaderboardPodium[2].level }}</p>
          <p>EXP: {{ leaderboardPodium[2].exp }}</p>
   
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
        class="row listItem d-flex mb-4 align-items-center rounded-3 px-3 pt-3 d-flex-row" v-bind:style="{ backgroundColor: person.email==this.myUser ? 'lightgoldenrodyellow' : '#cdbea2' , borderColor : person.email==this.myUser ? '#00AEEF ' : '#7e6e5c', boxShadow : person.email==this.myUser ?  '0 0 30px 5px #48abe0':''}"
      >
        <div class="col-md-1 mb-3 me-4">
          <h2 v-if="friendsBool == true">{{ index + 1 }}</h2>
          <h2 v-else>{{ index + 4 }}</h2>
        </div>
        <div
          class="col-md-2 justify-content-center d-flex flex-column align-items-center"
        >
          <img class="podium" :src="person.profile_pic_ID" />
          <p class="fw-bold text-center">Level {{ person.level }}</p>
        </div>
        <div class="col-md-6 mb-3 text-center">
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
      friendsBool: false,
      leaderboardPodium: [],
      leaderboardList: [],
    };
  },
  methods: {
    async friendBool() {
      if (this.friendsBool == true){
        this.friendsBool = false
        this.getAllUsers()
      }
      else{
        this.friendsBool = true
        console.log(this.friendsBool)
        this.getAllFriends()
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

      const q = query(collection(db, "accounts"), orderBy("exp", "desc"));
      const querySnap = await getDocs(q);
      querySnap.forEach((doc) => {
      if (friendsList.includes(doc.data().email)) {
          this.leaderboardList.push(doc.data());
        }       
  
      })
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

h3 {
  text-align: center;
  font-family: Georgia, serif;
  margin-bottom: 15px;
}

.nav {
  font-family: Georgia, serif;
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
  font-family: Georgia, serif;
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
  font-family: Georgia, serif;

}
</style>
