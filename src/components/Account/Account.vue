<template>
    <div class="container-fluid bg-image">
  <div class="container-fluid bg-overlay">
      <ProfileInfo></ProfileInfo>
      <SkinSelect></SkinSelect>
</div>
  </div>
</template>

<script>
import ProfileInfo from "./ProfileInfo.vue";
import SkinSelect from "./SkinSelect.vue";

  export default {
      name: 'Account',
      components: {
          ProfileInfo,
          SkinSelect,

      },
      data() {
          return {
              
          }
      }
  }
</script>

<style scoped>
.bg-image {
  background-image: url("/src/assets/images/background3.png");
  background-attachment: fixed;
  background-size: cover; /* Optional: Scales the background image to cover the entire container */
  background-position: center;
  background-color: black;
  padding: 0px;
}

.bg-overlay {
  content: "";
  padding: 10px;
  background: rgba(0, 0, 0, 0.651);
  background-size: cover; 
  z-index: 0;
}
</style>
