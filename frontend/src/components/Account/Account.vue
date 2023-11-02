<template>
  <div class="bg-image p-5">
    <div class="bg-overlay p-5">
      <div class="container-fluid mt-5">
        <div class="row d-flex flex-row align-items-center justify-content-center">
          <div class="col-lg-4">
            <ProfileInfo></ProfileInfo>
          </div>
          <div class="col-lg-8">
            <SkinSelect></SkinSelect>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileInfo from "./ProfileInfo.vue";
import SkinSelect from "./SkinSelect.vue";

export default {
  name: "Account",
  components: {
    ProfileInfo,
    SkinSelect,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.bg-image {
  background-image: url("/assets/images/background3.png");
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
