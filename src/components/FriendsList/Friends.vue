<template>
    <div class="container d-flex flex-row justify-content-between">
      <h3>Friends ({{ numberOfFriends }})</h3>
      <form class="d-flex w-50" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Add Friends by Username"
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
    <div class="container bg-white">
      <div class="row mt-5 ms-1 d-flex w-100 justify-content-start">
        <!-- Conditional rendering of friend list -->
        <div
          v-if="friends.length > 0"
          v-for="friend in friends"
          :key="friend.username"
          :id="friend.username"
          class="border-5 rounded-4 border border-white p-4 my-2 bg-secondary col-12 col-md-6 col-lg-4 col-xl-3 d-flex flex-row align-items-center"
          @click="openModal(friend.username)"
        >
          <div class="profilePic">
            <img :src="friend.picture" class="rounded-circle" />
          </div>
          <div class="ms-4 mt-1 text-center fs-6">
            <p class="text-white">{{ friend.profile_name }}</p>
            <p class="text-white">{{ friend.username }}</p>
            <p class="text-white">
              Level: {{ friend.level }}
            </p>
            <!-- You can include online/offline status here -->
          </div>
        </div>
        <!-- Show loading or empty state when friends are not yet available -->
        <div v-else>
          <p class="fs-1">Loading friends...</p>
          <!-- You can also add a loading spinner here if needed -->
        </div>
      </div>
    </div>
    <teleport to="body">
      <FriendModal v-if="isModal" :username="friendOpen" @close="closeModal" />
    </teleport>
  </template>
  
  <script>
  import store from '../../store/index';
  import FriendModal from "./FriendModal.vue";
  import db from "../../firebase/init";
  import { getDoc, doc } from "firebase/firestore";
  export default {
    name: "Friends",
    components: {
      FriendModal,
    },
    data() {
      return {
        numberOfFriends: 5,
        isModal: false,
        friendOpen: "",
        friends: [],
      };
    },
    methods: {
      openModal(username) {
        console.log(username);
        this.isModal = true;
        this.friendOpen = username;
      },
      closeModal() {
        this.isModal = false;
      },
      async getFriends() {
        const docSnap = await getDoc(doc(db, "accounts", "ryanang333"));
        if (docSnap.exists()) {
          var myFriends = docSnap.data().friends;
          console.log(myFriends);
          for (const value of myFriends) {
            const friendDocSnap = await getDoc(doc(db, "accounts", value));
            const friendDetails = friendDocSnap.data();
            console.log(friendDetails);
            this.friends.push({
              profile_name: friendDetails.profile_name,
              username: friendDetails.username,
              level: friendDetails.level,
              picture: friendDetails.profile_pic_ID
            });
          }
          console.log(this.friends);
        } else {
          console.log("User data doesn't exist");
        }
      },
    },
    mounted() {
      this.getFriends();
    },
  };
  </script>
  
  <style scoped></style>
  