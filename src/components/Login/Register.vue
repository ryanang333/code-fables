<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p v-if="errMsg" style="color: red">{{ errMsg }}</p>
  <p><button @click="register">Register</button></p>
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

<style scoped></style>
