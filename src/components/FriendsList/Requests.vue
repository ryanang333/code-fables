<template>
  <div class="container d-flex flex-row justify-content-between">
    <h3>Friend Requests ({{ numberOfRequests }})</h3>
  </div>
  <div class="container bg-white">
    <div class="row mt-5 ms-1 d-flex w-100 justify-content-start">
      <div
        v-if="numberOfRequests > 0"
        v-for="request in requestDetails"
        :key="request"
        :id="request"
        class="border-5 rounded-4 border border-white p-4 my-2 bg-secondary col-12 col-lg-6 d-flex flex-row align-items-center"
      >
        <div class="col-3 profilePic">
          <img
            :src="request.profile_pic_ID"
            style="width: 150px; height: 150px"
          />
        </div>
        <div class="col-1"></div>
        <div class="ms-4 mt-1 text-center fs-6">
          <p class="text-white">Name: {{ request.profile_name }}</p>
          <p class="text-white">Username: {{ request.username }}</p>
          <p class="text-white">Level: {{ request.level }}</p>
          <!-- You can include online/offline status here -->
          <button
            type="button"
            @click="acceptHandler(request.username)"
            class="btn btn-success me-5"
          >
            Accept
          </button>
          <button
            type="button"
            @click="ignoreHandler(request.username)"
            class="btn btn-danger ms-5"
          >
            Ignore
          </button>
        </div>
      </div>
      <div v-else>
        <p class="fs-1">No friend requests yet!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import db from "../../firebase/init";
export default {
  name: "Requests",
  components: {},
  data() {
    return {
      myUser: "",
      UID: "",
      requests: [],
      numberOfRequests: 0,
      requestDetails: [],
    };
  },
  methods: {
    async getRequests() {
      const docSnap = await getDoc(doc(db, "accounts", this.UID));
      const friendReq = docSnap.data().friend_requests;
      this.requests = friendReq;
      this.numberOfRequests = this.requests.length;
      for (const email of this.requests) {
        const friendInfo = await getDoc(doc(db, "user_profiles", email));
        const friendUID = await getDoc(
          doc(db, "accounts", friendInfo.data().uid)
        );
        const friendData = friendUID.data();
        console.log(friendData);
        this.requestDetails.push({
          uid: friendInfo.data().uid,
          exp: friendData.exp,
          level: friendData.level,
          profile_name: friendData.profile_name,
          profile_pic_ID: friendData.profile_pic_ID,
          username: email,
          friends: friendData.friends,
        });
        console.log(this.requestDetails);
      }
    },
    async acceptHandler(username) {
     
      console.log(username);
      const docSnap = await getDoc(doc(db, "accounts", this.UID));
      console.log(docSnap.data());
      const newFriendReq = this.requests.filter((email) => email !== username);
      const newFriends = docSnap.data().friends;
      newFriends.push(username);
      console.log(newFriends);
      await updateDoc(doc(db, "accounts", this.UID), {
        friends: newFriends,
        friend_requests: newFriendReq,
      });
      this.getRequests();
      const friendData = await getDoc(doc(db, "user_profiles", username));
      const friendUID = friendData.data().uid;
      const friendInfo = await getDoc(doc(db, "accounts", friendUID));
      const friendFriends = friendInfo.data().friends;
      friendFriends.push(this.myUser);
      await updateDoc(doc(db, "accounts", friendUID), {
        friends: friendFriends,
      });
    },
    async ignoreHandler(username) {
        const newFriendReq = this.requests.filter( (email) => email !== username);
        this.getRequests();
        await updateDoc(doc(db, "accounts", this.UID), {
            friend_requests:newFriendReq
        })
        
    },
  },
  mounted() {
    this.UID = getAuth().currentUser.uid;
    this.myUser = getAuth().currentUser.email;
    this.getRequests();
  },
};
</script>

<style></style>
