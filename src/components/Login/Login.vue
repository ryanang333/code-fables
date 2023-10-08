<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h1 class="text-center">Login</h1>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  class="form-control"
                  v-model="username"
                  required
                />
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  v-model="password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                Login
              </button>
            </form>
            <p v-if="loginError" class="text-danger mt-3">
                {{ errorReason }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      loginError: false,
      errorReason: '',
    };
  },
  methods: {
    async login() {
      // Simulate a simple login process (replace with your actual authentication logic)
      const data = await this.$store.dispatch("fetchData", {
        collection: "accounts",
        documentKey: this.username,
      });
      if (data === null){
        this.errorReason = 'Wrong username.';
        this.loginError = true;
      }else if(data.password !== this.password){
        this.errorReason = 'Wrong password.';
        this.loginError = true;
      }
      else { 
        this.$store.dispatch("setUserData", data);
        this.$router.push('/');
        this.loginError = false;
        console.log(this.$store.getters.getUserData)
      }
      console.log(data);

      this.username = "";
      this.password = "";
 
    },
  },
};
</script>

<style scoped></style>
