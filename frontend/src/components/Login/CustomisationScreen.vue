<template>
  <div class="container-fluid bg-image">
    <div class="container-fluid bg-overlay">
      <div class="row d-flex justify-content-center">
        <img
          src="/assets/images/code-fables.png"
          class="text-center mt-3"
          style="width: 400px; height: auto"
        />
      </div>
      <div
        class="container mt-5 bg-dark rounded-5 "
        style="margin-left: auto; margin-right: auto"
        v-if="isLoaded"
      >

        <div class="row">
          <div class="col-12">
            <p class="fs-1 text-white text-center">Create a New Hero</p>
          </div>
        </div>
        <div class="row">
          <div class="col-6 col-md-12">
            <div id="carouselExample" class="carousel slide">
              <div class="carousel-inner">
                <div
                  class="carousel-item text-center"
                  v-for="(model, index) in models"
                  :key="model.name"
                  :class="{ active: index === 0 }"
                >
                  <ModelRender :modelUrl="model.url" />
                  <p class="text-white fs-2">
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
          <div class="col-6 col-md-12 d-flex justify-content-center align-items-center">
            <div class="mb-3 bg-secondary text-center pt-5 px-4  rounded-5">
              <label for="exampleInputEmail1" class="text-white form-label"
                >Who do you want to be known as?</label
              >
              <input
                type="text"
                class="form-control"
                id="chosenUsername"
                aria-describedby="username"
                v-model="display_name"
              />
              <p class="text-warning ms-1 mt-3 fw-bold">
                {{ errorMsg }}
              </p>
              <button
                type="button"
                class="mt-4 w-100 btn btn-success mb-5"
                @click="createCharacter"
              >
                Create Character
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../firebase/init";
import { doc, getDocs, query, collection, updateDoc } from "firebase/firestore";
import ModelRender from "../ModelRender/ModelRender.vue";
import { getAuth } from "firebase/auth";
export default {
  name: "CustomisationScreen",
  components: { ModelRender },
  data() {
    return {
      UID: "",
      models: [],
      selectedModelObj: {},
      display_name: "",
      errorMsg: "",
      isLoaded: false,
    };
  },
  methods: {
    async getModels() {
      const q = query(collection(db, "models"));
      const querySnap = await getDocs(q);

      querySnap.forEach((doc) => {
        this.models.push({ name: doc.id.toUpperCase(), url: doc.data().path });
      });
      this.isLoaded = true;
    },
    async createCharacter() {
      //guard statements for invalid display_name input
      this.errorMsg = "";
      if (this.display_name.length < 4) {
        this.errorMsg = "Chosen name must be at least 4 characters long!";
        return;
      }
      if (/^[0-9]+$/.test(this.display_name)) {
        this.errorMsg = "Chosen name cannot be all numbers!";
        return;
      }
      if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.display_name)) {
        this.errorMsg = "Chosen name cannot contain any special characters!";
        return;
      }

      const activeCarousel =
        document.getElementsByClassName("active")[0].childNodes[1];
      var selectedModelName = activeCarousel.textContent;
      this.models.forEach((modelObj) => {
        if (modelObj.name === selectedModelName) {
          this.selectedModelObj = modelObj;
        }
      });
      await updateDoc(doc(db, "accounts", this.UID), {
        profile_name: this.display_name,
        model_ID: this.selectedModelObj.url,
        profile_pic_ID: "/assets/images/ship-wheel.png",
      });
      this.$router.push("/");
    },
  },
  mounted() {
    this.getModels();
    this.UID = getAuth().currentUser.uid;
  },
};
</script>

<style scoped>
.bg-image {
  background-image: url("/assets/images/character_customisation_screen.jpg");
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
