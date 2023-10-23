<template>
  <div
    class="container-fluid bg-image d-flex flex-column align-items-center justify-content-center"
  >
    <div
      class="container-fluid bg-overlay d-flex flex-column align-items-center justify-content-center"
    >
      <div
        class="col-12 col-md-10 col-lg-9 col-xl-8 col-xxl-7 d-flex justify-content-center align-items-center"
      >
        <img
          src="/src/assets/images/code-fables.png"
          class="mb-5 logo-pic w-75"
        />
      </div>
      <div
        class="col-7 col-sm-6 col-md-5 col-lg-4 col-xl-3 col-xxl-3 container rounded-4 pt-5 pb-3 input-form d-flex flex-column justify-content-center align-items-center"
      >
        <div class="mb-3 w-75">
          <label for="exampleInputEmail1" class="form-label fw-bold text-black"
            >Email:</label
          >
          <input
            type="email"
            class="form-control w-100"
            aria-describedby="emailHelp"
            v-model="email"
            @keydown.enter="handleEnter"
          />
        </div>
        <div class="mb-3 w-75">
          <label
            for="exampleInputPassword1"
            class="form-label fw-bold text-black"
            >Password:</label
          >
          <input
            type="password"
            class="form-control"
            v-model="password"
            @keydown.enter="handleEnter"
          />
        </div>
        <p
          v-if="errMsg"
          class="mt-1 fs-6"
          style="color: rgba(255, 0, 0, 0.656)"
        >
          {{ errMsg }}!
        </p>
        <button @click="login" type="button" class="mt-1 mb-3 btn btn-dark">
          Sign In
        </button>
        <div class="mb-3 w-100 text-center">
          <p class="fs-6">
            Don't Have an Account?
            <a href="/register" class="text-success fw-bold"> Create it. </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  name: "Login",
  components: {},

  data() {
    return {
      email: "",
      password: "",
      errMsg: "",
    };
  },
  methods: {
    async login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((data) => {
          console.log("Successfuly logged in!");
          console.log(auth.currentUser);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              this.errMsg = "Invalid email";
              break;
            case "auth/user-not-found":
              this.errMsg = "No account with that email was found";
              break;
            case "auth/wrong-password":
              this.errMsg = "Incorrect password";
              break;
            default:
              this.errMsg = "Email or password was incorrect";
              break;
          }
        });
    },
    handleEnter() {
      this.login();
  },
  },
  
};
</script>

<style scoped>
.bg-image {
  background-image: url("/src/assets/images/background3.png");
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.bg-overlay {
  content: "";
  background: rgba(0, 0, 0, 0.65);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.input-form {
  background-color: #dbe5be;
  box-shadow: 2px 5px 5px 2px rgb(145, 167, 146);
  transition: transform 0.3s ease;
}

.input-form:hover {
  transform: scale(1.02);
}

/* @media screen and (max-width: 576px){
  .logo-pic{
    width:100%;
  }
  .input-form{
    width:70%;
  }
}

@media screen and (min-width: 576px){
  .logo-pic{
    width:90%;
  }
  .input-form{
    width:60%;
  }
}
@media screen and (min-width:768px){
  .logo-pic{
    width:80%;
  }
  .input-form{
    width:50%;
  }
}

@media screen and (min-width:1200px){
  .logo-pic{
    width:70%;
  }
  .input-form{
    width:35%;
  }
} */
</style>
