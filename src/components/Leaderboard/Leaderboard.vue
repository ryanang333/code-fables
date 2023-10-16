<template>
 
  <div class="container mt-5 podium-div" v-if="leaderboardPodium.length == 3">
    <h1 class="text-center mt-4">Leaderboard:</h1>
    <div class="mt-4 row justify-content-center">
      <div class="col-3 mt-5 text-center">
        <img class="podium" src="/src/assets/images/medalSecond.png" />
        <div
          class="bg-secondary-subtle card shadow d-flex flex-direction-column justify-content-center align-items-center"
        >
          <img
            class="mt-4 podium mb-2"
            :src="leaderboardPodium[1].profile_pic_ID"
          />

          <p class="fw-bold">
            Level {{ leaderboardPodium[1].level }}
          </p>
          <p class="">EXP: {{ leaderboardPodium[1].exp }}</p>
          <p class="">{{ leaderboardPodium[1].profile_name }}</p>
        </div>
      </div>
      <div class="col-3 text-center podium-div">
        <img class="podium" src="/src/assets/images/medalFirst.png" />
        <div
          class="bg-secondary-subtle card shadow d-flex flex-direction-column justify-content-center align-items-center"
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
        <img class="podium" src="/src/assets/images/medalThird.png" />
        <div
          class="bg-secondary-subtle card shadow d-flex flex-direction-column justify-content-center align-items-center"
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
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import db from "../../firebase/init";
import { getDocs, query, collection, orderBy } from "firebase/firestore";
export default {
  name: "Leaderboard",
  components: {},
  data() {
    return {
      UID: "",
      myUser: "",
      leaderboardPodium: [],
      leaderboardList: [],
    };
  },
  methods: {
    async getAllUsers() {
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
      console.log(this.leaderboardPodium);
      console.log(this.leaderboardList);
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
.podium {
  width: 80px;
  height: auto;
}

.podium-div p{
  margin-top:-8px;
}
</style>
