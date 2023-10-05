<template>
  <div class="container-fluid bg-success mt-0 outer-box">
    <div class="container-fluid h-100">
      <div class="row h-100 mx-5 d-flex align-items-center justify-content-between">
        <div class="col-1">
          <div class="icon-link">
            <a class="nav-link" href="/">Icon</a>
          </div>
        </div>
        <div class="col d-flex flex-row justify-content-end">
          <nav class="navbar navbar-expand-lg bg-success">
            <button
              class="navbar-toggler hamburger"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse hamburger-content" id="navbarSupportedContent">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="/leaderboard"
                    >Leaderboard</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="/myfriends"
                    >My Friends</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="/account"
                    >My Account</a
                  >
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
.icon-link {
  width: fit-content;
  position: fixed;
  top: 22px;
}

@media (max-width: 992px) {
  .hamburger {
    position: fixed; 
    right: 80px;
    top: 15px;
  }

  .hamburger-content {
    position: fixed;
    top: 55px;
    right: 50px;
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 5px;
    padding: 10px;
    z-index: 1000;
  }
}

.col a {
  position: relative;
  overflow: hidden;
  white-space: nowrap; 
  max-width: 100%; 
}

a {
  color: white;
  font-size: 18px;
}

.outer-box {
  height: 70px;
  position: relative; 
}

.nav-link {
  text-decoration: none;
  transition: transform 0.2s ease;
}

.nav-link:hover {
  transform: scale(1.1);
  text-decoration: underline;
}
</style>
