<template>
  <div
    class="container-fluid bg-image d-flex flex-column align-items-center justify-content-center"
  >
    <div
      id="overlay"
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
        <button @click="register" type="button" class="mt-1 mb-3 btn btn-dark">
          Sign Up
        </button>
        <div class="mb-3 w-100 text-center">
          <p class="fs-6">
            Already have an account?
            <a href="/login" class="text-success fw-bold"> Log in. </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from "../../firebase/init";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
export default {
  name: "Register",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      errMsg: "",
    };
  },
  methods: {
    register() {
      createUserWithEmailAndPassword(getAuth(), this.email, this.password)
        .then((data) => {
          console.log("Registered successfully!");
          const userUID = data.user.uid;
          this.createUser(userUID);
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
          console.log(error.code);
          switch (error.code) {
            case "auth/missing-email":
              this.errMsg = "Missing email address";
              break;
            case "auth/missing-password":
              this.errMsg = "Missing password";
              break;
            case "auth/invalid-email":
              this.errMsg = "Invalid email";
              break;
            case "auth/email-already-in-use":
              this.errMsg = "Email already exists!";
              break;
            case "auth/weak-password":
              var errorMessageParts = error.message.split(" (");
              if (errorMessageParts.length >= 2) {
                errorMessageParts = errorMessageParts[0].split(": ");
                this.errMsg = errorMessageParts[1];
              } else {
                this.errMsg = "Weak password";
              }
              break;
          }
        });
    },
    handleEnter(){
      this.register();
    },
    async createUser(userUID) {
      await setDoc(doc(db, "user_profiles", this.email), {
        uid: userUID,
      });
      await setDoc(doc(db, "accounts", userUID), {
        exp: 0,
        friend_requests: [],
        friends: [],
        level: 0,
      });
    },
  },
};
</script>

<style scoped>
.bg-image {
  background-image: url("/src/assets/images/bgRegister.jpg");
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
</style>
