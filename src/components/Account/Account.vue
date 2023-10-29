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
  height: 100vh;
  width: 100vw;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.bg-overlay {
  content: "";
  background: rgba(0, 0, 0, 0.65);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
