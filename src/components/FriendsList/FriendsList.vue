<template>
  <div class="bg-image p-4">
    <div class="bg-overlay p-5">
      <FriendListTab @tab-updated="updateTab" />
      <Friends v-if="isFriend" />
      <Requests v-else />
    </div>
  </div>
</template>

<script>
import FriendListTab from "./FriendListTab.vue";
import Friends from "./Friends.vue";
import Requests from "./Requests.vue";
export default {
  name: "FriendsList",
  components: {
    FriendListTab,
    Friends,
    Requests,
  },
  data() {
    return {
      isFriend: true,
    };
  },
  methods: {
    updateTab(update) {
      this.isFriend = update;
    },
  },
};
</script>

<style scoped>
.bg-image {
  background-image: url("/src/assets/images/background3.png");
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position:fixed;
  overflow-x:auto;
}



.bg-overlay {
  content: "";
  background: rgba(0, 0, 0, 0.65);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position:fixed;
  overflow-x:auto;
}
</style>
