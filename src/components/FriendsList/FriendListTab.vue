<template>
  <div class="container my-5 ">
      <div class="container" style="position:fixed; left:0px; top:80px; z-index: 999;">
        <button @click="displayFriendTab"
          class="btn btn-lg btn-success"
          id="nav-friends-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-friends"
          type="button"
          role="tab"
          aria-controls="nav-friends"
          aria-selected="true"
        >Friends</button>
        <button @click="displayRequestTab"
          class="btn btn-lg btn-success ms-2"
          id="nav-leaderboard-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-leaderboard"
          type="button"
          role="tab"
          aria-controls="nav-leaderboard"
          aria-selected="false"
        >Requests</button>
      </div>
  </div>
</template>

<script>
export default {
  name: "FriendListTab",
  methods: {
    displayFriendTab(){
        this.$emit("tab-updated", true);
    },
    displayRequestTab(){
        this.$emit("tab-updated", false);
    }
  }
};
</script>

<style scoped>
.nav {
  font-family: Georgia, serif;
}

</style>
