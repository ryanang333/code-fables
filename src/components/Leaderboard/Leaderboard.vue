<template>
  <h1>Leaderboard</h1>
  {{ userData }}
  <button @click="getData">press me</button>
</template>

<script>
export default {
  name: "Leaderboard",
  components: {},
  computed: {
    userData() {
      console.log(this.$store.getters.getUserData);
      return this.$store.getters.getUserData;
    },
  },
};
</script>

<style scoped>

</style>
