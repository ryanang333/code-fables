<template>
  <div class="container d-flex flex-column justify-content-between">
    <h2 class="text-center">
      <img src="/assets/images/friends.png" style="width: 40%" />
    </h2>
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-12 mt-3 col-sm-9 col-md-6 col-lg-5 ">
        <input
          class="form-control"
          type="search"
          placeholder="Add Friends by Email"
          aria-label="Search"
          v-model="friendRequest"
        />
      </div>
      <div class="col-12 mt-3 col-sm-2 text-center">
        <button class="btn btn-dark" type="submit" @click="openRequestModal">
          Search
        </button>
      </div>
    </div>
  </div>
  <div class="container">
    <div
      class="row mt-3 mt-lg-5 ms-1 d-flex w-100 justify-content-start"
      style="overflow-x: clip"
    >
      <!-- Conditional rendering of friend list -->
      <div
        v-if="friends.length > 0"
        v-for="friend in friendsDetails"
        :key="friend.username"
        :id="friend.username"
        class="border border-5 border-black rounded-4 p-3 bg-secondary col-12 col-lg-6 d-flex flex-row align-items-center friend-div"
      >
        <div class="container">
          <div
            class="row d-flex justify-content-between align-items-center"
            @click="openFriendModal(friend.username)"
          >
            <div class="col-12 col-xl-6 text-center mb-2">
              <img
                :src="friend.profile_pic_ID"
                class="rounded-circle"
                style="width: 200px"
              />
            </div>
            <div
              class="col-12 col-xl-6 d-flex flex-column justify-content-center align-items-center text-center"
            >
              <p class="text-white">Name: {{ friend.profile_name }}</p>
              <p class="text-white">Username: {{ friend.username }}</p>
              <p class="text-white">Level: {{ friend.level }}</p>
              <!-- You can include online/offline status here -->
            </div>
          </div>
          <div
            class="row d-flex justify-content-center mt-3"
            style="margin-left: auto; margin-right: auto"
          >
            <button
              type="button"
              class="btn btn-warning"
              @click="openChat(friend)"
            >
              Chat
            </button>
          </div>
        </div>
      </div>
      <!-- Show loading or empty state when friends are not yet available -->
      <div v-else>
        <p v-if="isLoaded" class="fs-1 text-white">No friends yet!</p>
        <!-- You can also add a loading spinner here if needed -->
      </div>
    </div>
    <!--       style="position:absolute; top:0px; right:0px;" -->
  </div>
  <div
    v-if="isChatOpen"
    class="row d-flex flex-col justify-content-center align-items-center bg-dark-subtle rounded-5"
    :key="chatFriend"
    style="position: fixed; bottom: 0px; right: 0px; z-index: 99999"
  >
    <Inbox
      :currentUser="userDetails"
      :friendInfo="chatFriend"
      :username="friendOpen"
    />
    <button type="button" class="btn btn-danger w-25 mb-4" @click="closeChat">
      Close Chat
    </button>
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
      isLoaded: false,
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
        this.isLoaded = true;
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
.bg-image {
  background-image: url("/assets/images/background3.png");
  background-attachment: fixed;
  background-size: cover; /* Optional: Scales the background image to cover the entire container */
  background-position: center;
  background-color: black;
  padding: 0px;
}
.friend-div:hover {
  transform: scale(1.01); /* Scale the element on hover */
  transition: transform 0.2s; /* Add smooth transitions */
}

p,
h1,
h2,
h3 {
  font-family: Georgia, serif;
}

.btn {
  font-family: Georgia, serif;
}
</style>
