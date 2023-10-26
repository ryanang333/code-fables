<template>
  <div class="container">
    <div id="carouselExample" class="carousel slide">
          <div class="carousel-inner">
            <div
              class="carousel-item text-center"
              v-for="(model, index) in models"
              :key="model.name"
              :class="{ active: index === 0 }"
            >
              <ModelRender :modelUrl="model.url" />
              <!-- need to implment some sort of v-if here to disable and have overlay if the user havent unlock certain skins -->
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
      
  </template>
  
  <script>
      import { getDoc, doc ,getDocs, query, collection, } from "firebase/firestore"; 
      import { getAuth } from "firebase/auth";
      import ModelRender from '../ModelRender/ModelRender.vue';
      import db from "../../firebase/init";
      export default {
name: "SkinSelect",
components: {
  ModelRender

},
data() {
  return {
    models: [],
    selectedModel: "",
    username: '',
    profileUrl: '',
    friends: [],
    friendsDetails: [],
    UID: '',
    numberOfFriends: 0,
    isFriendModal: false,
    friendOpen: "",
    friendRequest: "",
    isRequestModal: false,
  };
},
methods: {
  async getInfo() {
    const docSnap = await getDoc(doc(db, 'accounts', this.UID));
    if (docSnap.exists()){
      let username = docSnap.data().profile_name;
      this.username = username

      let profile_pic = docSnap.data().profile_pic_ID;''
      this.profileUrl = profile_pic
    }

  },async getModels() {
    const q = query(collection(db, "models"));
    const querySnap = await getDocs(q);
  
    querySnap.forEach((doc) => {
      // console.log(doc.data().path);
      // console.log(doc.id);
      this.models.push({'name': doc.id.toUpperCase(), 'url':doc.data().path})
    });

    console.log(this.models);
  },
  selectModel() {
    const activeCarousel = document.getElementsByClassName("active")[0];
    console.log(activeCarousel);
  },
  
},
mounted(){
  this.UID = getAuth().currentUser.uid;
  this.username = getAuth().currentUser.email;
  this.getInfo();
  this.getModels();
}
};
  </script>
  
  <style scoped>
  .container{
      position: relative;
      background-image: url("/src/assets/images/background3.png");
      margin-left: 0px;
      margin-right: 20px;
      margin-top: 20px;
      width: 100%;
      opacity: 90%;
      background-color: rgb(202, 202, 202);
      padding: 20px;
      border-radius: 15px;
  }

  button {
      position: absolute;
      right: 20px;
  }

  p,h2, h3 {
      text-align: center;
  }

  img {
      border-radius: 50%;
      height: 150px;
      width: auto;
      margin-left:auto;
      margin-right: auto;
  }
  
  </style>
  