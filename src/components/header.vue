<template>
  <div>
    <header class="payment-header">
      <h1 class="payment-header__title" @click="$router.push('/home')">
        Payment System
      </h1>
      <nav class="payment-header__nav">
        <div v-if="loggedIn" class="payment-header__user">
          <ul class="payment-header__menu">
            <li
              :class="{
                'payment-header__menu-item': true,
                active: $route.path === '/home',
              }"
            >
              <router-link to="/home">Home</router-link>
            </li>
            <li
              :class="{
                'payment-header__menu-item': true,
                active: $route.path === '/carts',
              }"
              style="position: relative"
            >
              <router-link to="/carts">Cart</router-link>
              <span class="cart-count">{{ carts.length }}</span>
            </li>
          </ul>
          <li
            :class="{
              'payment-header__menu-item': true,
              active: $route.path === '/user-info',
            }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
              />
            </svg>
            <router-link to="/user-info">User info</router-link>
          </li>
          <button class="btn-logout" @click="handleLogout">Logout</button>
        </div>
        <div v-else class="payment-header__user">
          <router-link
            to="login"
            :class="{
              'payment-header__menu-item': true,
              active: $route.path === '/login',
            }"
          >
            Login</router-link
          >
          <p>/</p>
          <p>
            <router-link
              to="register"
              :class="{
                'payment-header__link-item': true,
                active: $route.path === '/register',
              }"
            >
              Register
            </router-link>
          </p>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState(['loggedIn', 'user', 'carts']),
  },

  methods: {
    ...mapMutations(['logout']),
    handleLogout() {
      this.logout();
      this.$router.push('/login');
    },
  },
};
</script>

<style>
.payment-header {
  background-color: #4caf50;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-count {
  width: 20px;
  background: red;
  color: #fff;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: 15px;
  position: absolute;
  right: -15px;
  top: -10px;
}

.payment-header__menu-item.active a,
.payment-header__link-item.active {
  color: #071e5d;
  font-weight: 600;
}

.payment-header__title {
  margin: 0;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}
.btn-logout {
  background: crimson;
  margin-left: 10px;
  color: #fff;
}

.payment-header__nav {
  display: flex;
  align-items: center;
}

.payment-header__menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  /* margin-right: 10px; */
  align-items: center;
}

.payment-header__menu-item {
  list-style: none;
  margin-left: 10px;
  display: flex;
}

.payment-header__menu-item svg {
  width: 15px;
  margin-right: 8px;
}

.payment-header__menu-item a {
  text-decoration: none;
  color: #fff;
}
.payment-header__user a {
  color: #fff;
}
.payment-header__user {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
