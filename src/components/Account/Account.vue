<template>
    <div class="container-fluid bg-image">
      <ProfileInfo></ProfileInfo>
      <SkinSelect></SkinSelect>
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
  background-color: #023020;
  width: 100vw;
  margin-top: 0;
  padding: 20px;
}
</style>
