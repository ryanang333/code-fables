<template>
  <nav class="navbar navbar-expand-lg bg-dark" id="sticky-nav">
    <div class="container-fluid mx-5 row p-1">
      <div class="col-lg-1 col-2 mx-auto">
        <a class="navbar-brand" href="/">
          <img
            src="/assets/images/code-fables.png"
            style="width: 200px; height: auto"
          />
        </a>
      </div>

      <div class="col-lg-3 col-8"></div>
      <div class="col-2 mx-auto">
        <button
          class="navbar-toggler bg-success"
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
      <div
        class="col-lg-4 col-sm-3 justify-content-end collapse navbar-collapse"
        id="navbarNav"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <a
              class="nav-link me-lg-2 me-xl-5"
              aria-current="page"
              href="/leaderboard"
              >Leaderboard</a
            >
          </li>
          <li class="nav-item me-lg-2 me-xl-5">
            <a class="nav-link" href="/myfriends">Friends</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Account
            </a>
            <ul class="dropdown-menu bg-dark text-white border-0">
              <li><a class="dropdown-item" href="/account">My Profile</a></li>
              <li>
                <button class="dropdown-item" @click="logOut">Sign Out</button>
              </li>
            </ul>
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
    return {};
  },
  methods: {
    logOut() {
      let auth = getAuth();
      signOut(auth).then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style scoped>
#sticky-nav {
  position: sticky;
  top: 0;
  z-index: 100;
}
a,
button {
  color: white;
  font-size: 22px;
  text-decoration: none;
  font-family: Georgia, serif;
}

a:hover {
  opacity: 0.9; /* Decrease the opacity on hover */
  color: #88fcd7;
}
</style>
