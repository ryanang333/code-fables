<template>
  <h1>Login</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p v-if="errMsg" style="color: red">{{ errMsg }}</p>
  <p><button @click="login">Login</button></p>
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
        .then((data)=> {
          console.log('Successfuly logged in!');
          console.log(auth.currentUser);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              this.errMsg = 'Invalid email';
              break;
            case "auth/user-not-found":
              this.errMsg = "No account with that email was found";
              break;
            case "auth/wrong-password":
              this.errMsg = 'Incorrect password';
              break;
            default:
              this.errMsg = 'Email or password was incorrect';
              break;
          }
        })
    },
  },
};
</script>

<style scoped></style>
