<template>
  <h1>Leaderboard</h1>
  <!-- {{ userData }} -->
  <button @click="getData">press me</button>
</template>

<script>
export default {
  name: "Leaderboard",
  components: {},
  computed: {
   
  },
  methods: {
    getData() {
        const data = this.$store.getters.getUserData;
        console.log(data);
        return this.$store.getters.getUserData;
    },
  },
  mounted() {
    this.$store.getters.getUserData;
    console.log(this.$store.getters.getUserData);
  }
};
</script>

<style scoped></style>
