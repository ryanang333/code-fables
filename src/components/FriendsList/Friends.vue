<template>
  <div class="container d-flex flex-row justify-content-between">
    <h3>Friends ({{ numberOfFriends }})</h3>
    <form class="d-flex w-50" role="search" @submit.prevent="openRequestModal">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Add Friends by Username"
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
        class="border-5 rounded-4 border border-white p-4 my-2 bg-secondary col-12 col-md-6 col-lg-4 col-xl-3 d-flex flex-row align-items-center"
        @click="openFriendModal(friend.username)"
      >
        <div class="profilePic">
          <img :src="friend.profile_pic_ID" class="rounded-circle" />
        </div>
        <div class="ms-4 mt-1 text-center fs-6">
          <p class="text-white">{{ friend.profile_name }}</p>
          <p class="text-white">{{ friend.username }}</p>
          <p class="text-white">Level: {{ friend.level }}</p>
          <!-- You can include online/offline status here -->
        </div>
      </div>
      <!-- Show loading or empty state when friends are not yet available -->
      <div v-else>
        <p class="fs-1">No friends yet!</p>
        <!-- You can also add a loading spinner here if needed -->
      </div>
    </div>
  </div>
  <teleport to="body">
    <FriendModal
      v-if="isFriendModal"
      :username="friendOpen"
      :isSearching="false"
      :friendDetails="friendsDetails"
      @close="closeFriendModal"
    />
  </teleport>
  <teleport to="body">
    <FriendModal
      v-if="isRequestModal"
      :username="friendRequest"
      :isSearching="true"
      @close="closeRequestModal"
      :friendUsername="friendRequest"
    />
  </teleport>
</template>

<script>
import FriendModal from "./FriendModal.vue";
export default {
  name: "Friends",
  components: {
    FriendModal,
  },
  data() {
    return {
      numberOfFriends: 0,
      isFriendModal: false,
      friendOpen: "",
      friends: [],
      friendRequest: "",
      isRequestModal: false,
      friendsDetails: [],
    };
  },
  watch: {
    "$store.state.dataOfUser.friends": "getFriends",
  },
  methods: {
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
      this.friends = this.$store.getters.getUserData.friends;
      this.friendsDetails = []; // Clear the existing data
      for (const value of this.friends) {
        const friendData = await this.$store.dispatch("fetchData", {
          collection: "accounts",
          documentKey: value,
        });
        this.friendsDetails.push({
          exp: friendData.exp,
          level: friendData.level,
          profile_name: friendData.profile_name,
          profile_pic_ID: friendData.profile_pic_ID,
          skin_ID: friendData.skin_ID,
          username: friendData.username,
          friends: friendData.friends,
        });
      }
      this.numberOfFriends = this.friends.length;
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
