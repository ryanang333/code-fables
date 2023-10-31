<template>
  <div class="container">
    <div id="carouselExample" class="carousel slide">
          <div class="carousel-inner">
            <div class="textbox">Use mouse controls to inspect your character!</div>
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
        <button type="button" id="saveModel" class="btn btn-success submit" @click="updateModel" disabled>Set Character</button>
  </div>

      
  </template>
  
  <script>
      import { getDoc, doc ,getDocs, query, collection, updateDoc} from "firebase/firestore"; 
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
    selectedModelName: "",
    displayedModel: "",
    username: '',
    profileUrl: '',
    modelUrl:'',
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
    this.models = []
    const q = query(collection(db, "models"));
    const querySnap = await getDocs(q);
    querySnap.forEach((doc) => {
      //get remaining models that isnt the users active
      if (doc.data().path == this.selectedModel){
        this.models.unshift({'name': doc.id.toUpperCase(), 'url':doc.data().path})
        this.selectedModelName = doc.id.toUpperCase()
      }
      else{
        this.models.push({'name': doc.id.toUpperCase(), 'url':doc.data().path})
      }
      // console.log(doc.data().path);
      // console.log(doc.id);
    });
    

  },
  updateButton() {
    const activeCarousel =
      document.getElementsByClassName("active")[0].childNodes[1];
      var displayedModel = activeCarousel.textContent;
      this.displayedModel = displayedModel
      if(this.selectedModelName != displayedModel ){
        document.getElementById("saveModel").disabled = false
      }
      else{
        document.getElementById("saveModel").disabled = true
      }
  },
  async updateModel() {
    const docSnap = await getDoc(doc(db, 'models', this.displayedModel.toLowerCase()));
      if (docSnap.exists()){
        this.modelUrl = docSnap.data().path;
      }
          await updateDoc(doc(db, 'accounts', this.UID), {model_ID:this.modelUrl} )
          alert("Character Updated")
          location.reload()
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

  .textbox {
    position: absolute;
    right: 10px;
    background-color: #cdbea2;
    border-radius: 5px;
    border: 3px solid #7e6e5c ;
    padding: 10px;
  }

  .submit {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
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
  