<template>
  <div class="container my-5 ">
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <button @click="displayFriendTab"
          class="nav-link active"
          id="nav-friends-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-friends"
          type="button"
          role="tab"
          aria-controls="nav-friends"
          aria-selected="true"
        >My Friends</button>
        <button @click="displayLeaderboardTab"
          class="nav-link"
          id="nav-leaderboard-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-leaderboard"
          type="button"
          role="tab"
          aria-controls="nav-leaderboard"
          aria-selected="false"
        >Leaderboard</button>
      </div>
      
    </nav>
  </div>
</template>

<script>
export default {
  name: "SocialNavTab",
  methods: {
    displayFriendTab(){
        this.$emit("tab-updated", true);
    },
    displayLeaderboardTab(){
        this.$emit("tab-updated", false);
    }
  }
};
</script>

<style></style>
