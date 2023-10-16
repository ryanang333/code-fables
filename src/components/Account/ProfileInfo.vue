<template>
    <div class="container">
        <button type="button" class="btn btn-link">
            Edit Profile
        </button>
        <div class="row">
            <img :src="profileUrl" alt="">
        </div>
        <div class="row">
            <h2>{{username}}</h2>
            <h3>Level 38</h3>
        </div>
        <div class="row">
            <div class="levelback">
            <div class="level">90%</div>
            </div>
        </div>  
        <div class="row">
            <p>40 exp to next level</p>
        </div>
        <div class="row">
            <div class="col-4">Friends</div>
            <div class="col-4">games completed</div>
            <div class="col-4">lol</div>
        </div>
    </div>
        
    </template>
    
    <script>
        import { getDoc, doc } from "firebase/firestore"; 
        import { getAuth } from "firebase/auth";
        import db from "../../firebase/init";
        export default {
  name: "ProfileInfo",
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

        console.log(docSnap.data())
        let username = docSnap.data().profile_name;
        this.username = username

        let profile_pic = docSnap.data().profile_pic_ID;
        console.log(profile_pic)
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
    