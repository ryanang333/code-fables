<template>
  <div class="modal-overlay d-flex align-items-center justify-content-center">
    <div class="modal-container w-50 bg-secondary-subtle p-5 rounded-4">
      <div class="text-center d-flex justify-content-center">
        <h1 class="fs-1 text-center mb-5">{{ profile_name }}</h1>
      </div>
      <div
        class="d-flex flex-column align-items-center justify-content-center"
      >
        <img :src="profile_pic_ID" class="w-50" />
        <p class="mb-2 fs-2 mt-5 mb-2">Username: {{ username }}</p>
        <p class="mb-2 fs-2 mb-2">Level: {{ level }}</p>
        <p class="mb-2 fs-2 mb-2">Experience: {{ experience }}</p>
        <p class="mb-2 fs-2 mb-2">Number of Friends: {{ numberOfFriends }}</p>
        <button class="btn btn-dark btn-block mt-3 w-25 fs-3 p-3" @click="closeModal">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FriendModal",
  data() {
    return {
      profile_name: "",
      level: "",
      experience: "",
      profile_pic_ID: "",
      numberOfFriends: 0,
      skin_ID: "",
    };
  },
  props: {
    username: String,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async loadFriendData() {
      const data = await this.$store.dispatch("fetchData", {
        collection: "accounts",
        documentKey: this.username,
      });
      this.profile_name = data.profile_name;
      this.level = data.level;
      this.experience = data.exp;
      this.profile_pic_ID = data.profile_pic_ID;
      this.skin_ID = data.skin_ID;
      this.numberOfFriends = data.friends.length;
    },
  },
  mounted() {
    this.loadFriendData();
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-container {
  box-shadow: 10px 10px 10px rgba(158, 148, 148, 0.6);
}

</style>
