<template>
  <div class="box-form">
    <h2 style="text-align: center">Welcome to the checkout page login page</h2>
    <form class="form" @submit="handleLogin">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="loginData.email" required />

      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="loginData.password"
        required
      />

      <button type="submit">Login</button>
    </form>
    <p class="signup-link">
      No account? <router-link to="/register">Register now</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { getRegisteredUser } from '../../utils/localStorage';
export default {
  computed: {
    ...mapState(['loggedIn']),
  },
  data() {
    return {
      loginData: {
        email: '',
        password: '',
      },
    };
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/home');
    }
  },
  methods: {
    ...mapActions(['performLogin']),
    checkLogin(email, password) {
      const registeredUsers = getRegisteredUser();

      const account = registeredUsers?.filter(
        (user) => user.email === email && user.password === password
      );

      if (account?.length > 0)
        return {
          email,
          fullName: account[0].fullName,
          address: account[0]?.address,
          remainingAmount: account[0]?.remainingAmount,
        };

      return null;
    },
    handleLogin(event) {
      event.preventDefault();
      const account = this.checkLogin(
        this.loginData.email,
        this.loginData.password
      );

      if (account) {
        this.performLogin({
          email: this.loginData.email,
          fullName: account.fullName,
          address: account?.address,
          remainingAmount: account?.remainingAmount,
        });
        this.$router.push('/home');
        alert('Login success!');
      } else {
        alert('Account does not exist!');
      }
    },
  },
};
</script>

<style>
.box-form {
  width: 50%;
  margin: auto;
}
.form {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
