<template>
    <div class="container-fluid bg-image">
  <div class="container-fluid bg-overlay">
  <div class="row justify-content-center ">   
      <div class="col-lg-4 col-md-12">
      <ProfileInfo></ProfileInfo>
  </div>
  <div class="col-lg-7 col-md-12">
      <SkinSelect></SkinSelect>
  </div>
  </div>
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
width: 100vw;
height: 100vh;
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
