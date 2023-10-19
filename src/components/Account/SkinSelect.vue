<template>
    <div class="container">
        <h1> Sin Select</h1>
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src=".../800x400?auto=yes&bg=777&fg=555&text=First slide" alt="First slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src=".../800x400?auto=yes&bg=666&fg=444&text=Second slide" alt="Second slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src=".../800x400?auto=yes&bg=555&fg=333&text=Third slide" alt="Third slide">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
    </div>
        
    </template>
    
    <script>
        import { getDoc, doc } from "firebase/firestore"; 
        import { getAuth } from "firebase/auth";
        import db from "../../firebase/init";
        export default {
  name: "SkinSelect",
  components: {

  },
  data() {
    return {
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

    },
  },
  mounted(){
    this.UID = getAuth().currentUser.uid;
    this.username = getAuth().currentUser.email;
    this.getInfo();
  }
};
    </script>
    
    <style scoped>
    .container{
        position: relative;
        margin-left: auto;
        margin-right: auto;
        margin-top: 40px;
        background-color: rgb(233, 233, 233);
        padding: 20px;
        border-radius: 30px;
    }

    .row {
        margin-top: 10px;
        margin-bottom: 10px;
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

    .levelback {
        position: relative;
        width: 60%; /* Full width */
        height: 25px;
        background-color: #ddd; /* Grey background */
        margin-left: auto;
        margin-right: auto;
        border-radius: 10px ;
    }

    .level {
        left: 0;
        position: absolute;
        padding-right: 10px;
        text-align: right; /* Right-align text */
        color: white; /* White text color */
        width: 90%; 
        height: 25px;
        background-color: #008170;
        border-radius: 10px ;
    }
    
    </style>
    