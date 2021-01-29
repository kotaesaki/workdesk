<template>
    <div>
    <h1>login</h1>
    <form @submit.prevent="login">
      <label for="email">Email</label>
      <input type="text" id="email" v-model="loginForm.login_id" />
      <label for="password">Password</label>
      <input type="password" id="password" v-model="loginForm.password" />
      <button type="submit">login</button>
    </form>
    </div>
</template>
<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      loginForm: {
        login_id: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$store.dispatch("auth/login", this.loginForm).then(() => {
        this.$router.push({ name: "home" });
      });
    }
  }
};

</script>
