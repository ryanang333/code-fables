<template>
  <div class="container-fluid bg-image">
    <div class="container-fluid bg-overlay">
      <div class="">
        <img
          src="/src/assets/images/code-fables.png"
          class="align-self-end img-fluid mt-3"
        />
      </div>
      <div class="row">
        <div class="col"></div>
        <div class="col bg-success">
          <p>Hello</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomisationScreen",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.bg-image {
  background-image: url("/src/assets/images/character_customisation_screen.jpg");
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.bg-overlay {
  content: "";
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
