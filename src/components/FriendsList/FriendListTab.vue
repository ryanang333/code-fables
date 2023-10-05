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
        >Friends</button>
        <button @click="displayRequestTab"
          class="nav-link"
          id="nav-leaderboard-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-leaderboard"
          type="button"
          role="tab"
          aria-controls="nav-leaderboard"
          aria-selected="false"
        >Requests</button>
      </div>
      
    </nav>
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

<style></style>
