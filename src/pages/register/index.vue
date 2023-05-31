<template>
  <div class="box-form">
    <h2 style="text-align: center">Welcome to the registration page</h2>
    <form class="form" @submit="register">
      <label for="fullName">Full name:</label>
      <input
        type="text"
        id="fullName"
        v-model="registerData.fullName"
        required
      />
      <label for="newEmail">Email:</label>
      <input type="email" id="newEmail" v-model="registerData.email" required />

      <label for="newPassword">Password:</label>
      <input
        type="password"
        id="newPassword"
        v-model="registerData.password"
        required
      />

      <label for="confirmPassword">Confirm password:</label>
      <input
        type="password"
        id="confirmPassword"
        v-model="registerData.confirmPassword"
        required
      />

      <button type="submit">Register</button>
    </form>

    <p class="signup-link">
      Already have an account?
      <router-link to="/login">Login now</router-link>
    </p>
  </div>
</template>

<script>
import {
  setRegisteredUser,
  checkExistingAccount,
} from '../../utils/localStorage';
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['loggedIn']),
  },
  data() {
    return {
      registerData: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/home');
    }
  },
  methods: {
    register(event) {
      event.preventDefault();
      if (this.registerData.password !== this.registerData.confirmPassword) {
        alert('Password incorrect. Please re-enter the password.');
        return;
      }
      const isExistingAccount = checkExistingAccount(this.registerData.email);
      if (isExistingAccount) {
        alert('Account already exists. Please use another account.');
        return;
      }
      setRegisteredUser(this.registerData);
      alert('Sign Up Success!');
      this.$router.push('/login');
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
