<template>
  <Navbar v-if="!$route.path.includes('/login') && !$route.path.includes('/register') && !$route.path.includes('/character') "/>
  <RouterView />
</template>

<script>
import Navbar from "./components/Navbar/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style></style>
