<template>
  <div class="container-fluid bg-success mt-0 outer-box">
    <div class="container h-100">
      <div class="row h-100 d-flex align-items-center">
        <div class="col">
          <a class="text-white nav-link fs-5" href="/">
            (Insert Icon Here)
          </a>
        </div>
        <div class="col-lg-6 col-sm-1 col-1"></div>
        <div class="col d-flex flex-row justify-content-between">
          <a class="text-white nav-link fs-5" href="/social">Social</a>
          <a class="text-white nav-link fs-5" href="/account">My Account</a>
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
.outer-box{
  height:70px;
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
