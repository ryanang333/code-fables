<template>
  <div class="container d-flex flex-row justify-content-between">
    <h3>Friends ({{ numberOfFriends }})</h3>
    <form class="d-flex w-50" role="search" @submit.prevent="openRequestModal">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Add Friends by Email"
        aria-label="Search"
        v-model="friendRequest"
      />
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
  <div class="container bg-white">
    <div class="row mt-5 ms-1 d-flex w-100 justify-content-start">
      <!-- Conditional rendering of friend list -->
      <div
        v-if="friends.length > 0"
        v-for="friend in friendsDetails"
        :key="friend.username"
        :id="friend.username"
        class="border-5 rounded-4 border border-white p-4 my-2 bg-secondary col-12 col-lg-6 d-flex flex-row align-items-center friend-div"
      >
        <div class="row" @click="openFriendModal(friend.username)">
          <div
            class="col-12 col-sm-4 col-md-6 col-lg-5 profilePic d-flex justify-content-center align-items-center"
          >
            <img
              :src="friend.profile_pic_ID"
              class="rounded-circle"
              style="width: 150px; height: 150px"
            />
          </div>
          <div class="col-1"></div>
          <div
            class="col-12 col-sm-6 col-md-5 mt-3 text-center fs-6 d-flex flex-column justify-content-center align-items-center"
          >
            <p class="text-white">Name: {{ friend.profile_name }}</p>
            <p class="text-white">Username: {{ friend.username }}</p>
            <p class="text-white">Level: {{ friend.level }}</p>
            <!-- You can include online/offline status here -->
          </div>
        </div>
        <button type="button" class="btn btn-warning" @click="openChat(friend)">
          Chat
        </button>
      </div>

      <!-- Show loading or empty state when friends are not yet available -->
      <div v-else>
        <p class="fs-1">No friends yet!</p>
        <!-- You can also add a loading spinner here if needed -->
      </div>
    </div>
    <div
      v-if="isChatOpen"
      class="row d-flex flex-col justify-content-center align-items-center"
      :key="chatFriend"
    >
      <Inbox
        :currentUser="userDetails"
        :friendInfo="chatFriend"
        :username="friendOpen"
      />
      <button type="button" class="btn btn-danger w-25" @click="closeChat">
        Close Chat
      </button>
    </div>
  </div>
  <teleport to="body">
    <FriendModal
      v-if="isFriendModal"
      :myUser="username"
      :username="friendOpen"
      :isSearching="false"
      :friendDetails="friendsDetails"
      :userFriends="friends"
      :myUID="UID"
      :onFriendRemoved="updateFriendsList"
      @close="closeFriendModal"
    />
  </teleport>
  <teleport to="body">
    <FriendModal
      v-if="isRequestModal"
      :myUser="username"
      :username="friendRequest"
      :isSearching="true"
      @close="closeRequestModal"
    />
  </teleport>
</template>

<script>
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import FriendModal from "./FriendModal.vue";
import db from "../../firebase/init";
import Inbox from "./Inbox.vue";
import config from "/config";
export default {
  name: "Friends",
  components: {
    FriendModal,
    Inbox,
  },
  data() {
    return {
      username: "",
      friends: [],
      friendsDetails: [],
      UID: "",
      numberOfFriends: 0,
      isFriendModal: false,
      friendOpen: "",
      friendRequest: "",
      isRequestModal: false,
      isChatOpen: false,
      chatFriend: "",
      userDetails: {},
    };
  },
  methods: {
    // async filterProfanitiesWithAPI(message) {
    //   const config = {
    //     method: 'post',
    //     url: 'https://api.apilayer.com/bad_words?censor_character=censor_character',
    //     headers: config.badWordsAPIKey,
    //     data: data,
    //   }
    // },
    closeChat() {
      this.isChatOpen = false;
    },
    openChat(friend) {
      this.isChatOpen = true;
      this.chatFriend = friend;
    },
    updateFriendsList(username) {
      console.log(username);
      var newFriends = this.friends.filter((friend) => friend !== username);
      this.friends = newFriends;
      var newFriendDetails = this.friendsDetails.filter(
        (friendObj) => friendObj.username !== username
      );
      console.log(newFriends);
      console.log(newFriendDetails);
      this.friendsDetails = newFriendDetails;
      this.numberOfFriends = this.friends.length;
    },
    openFriendModal(username) {
      this.isFriendModal = true;
      this.friendOpen = username;
    },
    closeFriendModal() {
      this.isFriendModal = false;
    },
    async openRequestModal() {
      this.isRequestModal = true;
    },
    closeRequestModal() {
      this.isRequestModal = false;
      this.friendRequest = "";
    },
    async getFriends() {
      const docSnap = await getDoc(doc(db, "accounts", this.UID));
      if (docSnap.exists()) {
        let userDet = docSnap.data();
        userDet["uid"] = docSnap.id;
        this.userDetails = userDet;
        console.log(this.userDetails);
        let friends = docSnap.data().friends;
        console.log(friends);
        this.friends = friends;
        this.numberOfFriends = this.friends.length;
        this.friendsDetails = [];
        for (const friendEmail of friends) {
          const friendInfo = await getDoc(
            doc(db, "user_profiles", friendEmail)
          );
          const friendUID = await getDoc(
            doc(db, "accounts", friendInfo.data().uid)
          );
          const friendData = friendUID.data();
          this.friendsDetails.push({
            uid: friendInfo.data().uid,
            exp: friendData.exp,
            level: friendData.level,
            profile_name: friendData.profile_name,
            profile_pic_ID: friendData.profile_pic_ID,
            username: friendEmail,
            friends: friendData.friends,
            model_ID: friendData.model_ID,
          });
        }
      }
    },
  },
  mounted() {
    this.UID = getAuth().currentUser.uid;
    this.username = getAuth().currentUser.email;
    this.getFriends();
  },
};
</script>

<style scoped>
.friend-div:hover {
  transform: scale(1.05); /* Scale the element on hover */
  transition: transform 0.2s; /* Add smooth transitions */
}
</style>
