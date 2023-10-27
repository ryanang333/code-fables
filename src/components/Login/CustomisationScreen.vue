<template>
  <div class="container-fluid bg-image">
    <div class="container-fluid bg-overlay">
      <div class="row d-flex justify-content-center">
        <img
          src="/src/assets/images/code-fables.png"
          class="text-center mt-3"
          style="width: 400px; height: auto"
        />
      </div>
      <div
        class="row d-flex flex-row align-items-center justify-content-center"
      >
        <div class="col-12 mt-5">
          <div id="carouselExample" class="carousel slide">
            <div class="carousel-inner">
              <div
                class="carousel-item text-center"
                v-for="(model, index) in models"
                :key="model.name"
                :class="{ active: index === 0 }"
              >
                <ModelRender :modelUrl="model.url" />

                <p class="mt-2 text-white fs-2">
                  {{ model.name }}
                </p>
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div class="col-10 mt-5">
          <div class="mb-3 bg-secondary p-4 rounded-5">
            <label for="exampleInputEmail1" class="text-white form-label"
              >Username</label
            >
            <input
              type="text"
              class="form-control"
              id="chosenUsername"
              aria-describedby="username"
            />
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          <button
            type="button"
            class="mt-5 w-50 btn btn-dark"
            @click="selectModel"
          >
            Create Character
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../firebase/init";
import { getDocs, query, collection, orderBy } from "firebase/firestore";
import ModelRender from "../ModelRender/ModelRender.vue";
export default {
  name: "CustomisationScreen",
  components: { ModelRender },
  data() {
    return {
      models: [],
      selectedModel: "",
    };
  },
  methods: {
    async getModels() {
      const q = query(collection(db, "models"));
      const querySnap = await getDocs(q);

      querySnap.forEach((doc) => {
        // console.log(doc.data().path);
        // console.log(doc.id);
        this.models.push({ name: doc.id.toUpperCase(), url: doc.data().path });
      });

      console.log(this.models);
    },
    selectModel() {
      const activeCarousel = document.getElementsByClassName("active")[0];
      console.log(activeCarousel);
    },
  },
  mounted() {
    this.getModels();
  },
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
