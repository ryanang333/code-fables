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
            @click="updateButton"
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
            @click="updateButton"
          >
            <span
              class="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Next</span>
          </button>



        </div>
        
        <button type="button" class="btn btn-success submit" @click="updateModel" disabled>Set as Current Skin</button>
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
    displayedModel: "",
    username: '',
    profileUrl: '',
    UID: '',
  };
},
methods: {
  async getInfo() {
    const docSnap = await getDoc(doc(db, 'accounts', this.UID));
    if (docSnap.exists()){
      let username = docSnap.data().profile_name;
      this.username = username

      let profile_pic = docSnap.data().profile_pic_ID;
      this.profileUrl = profile_pic
      this.selectedModel = docSnap.data().model_ID;
    }

  },async getModels() {
    const q = query(collection(db, "models"));
    const querySnap = await getDocs(q);

    //get user model first
  
    querySnap.forEach((doc) => {
      //get remaining models that isnt the users active
      if (doc.data().path == this.selectModel){
        this.models.unshift({'name': doc.id.toUpperCase(), 'url':doc.data().path})
      }
      else{
        this.models.push({'name': doc.id.toUpperCase(), 'url':doc.data().path})
      }
      // console.log(doc.data().path);
      // console.log(doc.id);
    });
    

  },
  async updateButton() {
    const activeCarousel =
      document.getElementsByClassName("active")[0].childNodes[1];
      var displayedModel = activeCarousel.textContent;
      console.log(displayedModel,this.selectedModel)
      if(this.selectedModel != this.displayedModel ){
        document.getElementById("save").disabled = false
      }
      else{
        document.getElementById("save").disabled = true
      }
  },
  async updateModel() {
      //guard statements for invalid display_name input

      
      // this.models.forEach((modelObj) => {
      //   if (modelObj.name === selectedModelName) {
      //     this.selectedModelObj = modelObj;
      //   }
      // })

    },
  
},
mounted(){
  this.UID = getAuth().currentUser.uid;
  this.username = getAuth().currentUser.email;
  this.getInfo();
  this.getModels();
  $('#carouselExample').on('slid.bs.carousel', this.updateButton);
  // this.selectModel();
},
beforeDestroy() {
    // Remove the event listener to prevent memory leaks
    $('#carouselExample').off('slid.bs.carousel', this.updateButton);
  },
};
  </script>
  
  <style scoped>
  .container{
      position: relative;
      background-image: url("/src/assets/images/background3.png");
      margin-left: auto;
      margin-right: auto;
      margin-top: 20px;
      width: 100%;
      background-color: rgb(202, 202, 202);
      padding: 20px;
      border-radius: 15px;
  }

  .submit {
    margin-left: 500px;
    margin-right: auto;
    width: 200px;
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
  