<template>
  <nav class="navbar navbar-expand-lg bg-success">
    <div class="container-fluid mx-5 row p-1">
      <div class="col-lg-1 col-2 mx-auto">
        <a class="navbar-brand" href="/">
          <img src="/src/assets/images/code-fables.png" style="width:150px; height:auto;"/>
        </a>
      </div>
      
      <div class="col-lg-3 col-8"></div>
        <div class="col-2 mx-auto">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
   
      <div class="col-lg-4 col-sm-3 justify-content-end collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link me-lg-2 me-xl-5 " aria-current="page" href="/leaderboard">Leaderboard</a>
          </li>
          <li class="nav-item me-lg-2 me-xl-5 ">
            <a class="nav-link " href="/myfriends">Friends</a>
          </li>
          <li class="nav-item">
            <a class="nav-link " href="/account">Account</a>
          </li>
          <li class="nav-item">
            <button class="nav-link" @click="logOut">Sign Out</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
let auth;
export default {
  name: "NavBar",
  data() {
    return {
      
    }
  },
  methods:{
    logOut(){
      let auth = getAuth();
      signOut(auth).then(() => {
        this.$router.push('/login');
      })
    }
  },
 
};
</script>

<style scoped> 

a, button {
  color: white;
  font-size: 18px;
  text-decoration:none;
}

a:hover {
  opacity: 0.9; /* Decrease the opacity on hover */
}


</style>
