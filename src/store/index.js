import Vuex from 'vuex';
import {
  getUserInfo,
  isLoggedIn,
  removeUser,
  loginUser,
  editUser,
  paymentHistoryByEmail,
  getCartsByEmail,
} from '../utils/localStorage';

const store = new Vuex.Store({
  state: {
    loggedIn: isLoggedIn(),
    user: getUserInfo(),
    carts: getCartsByEmail(getUserInfo()?.email) || [],
    paymentHistory: paymentHistoryByEmail(getUserInfo()?.email) || [],
  },
  mutations: {
    setLoggedIn(state, user) {
      state.loggedIn = true;
      state.user = user;
    },
    setUser(state, user) {
      state.user = user;
      loginUser(user);
    },
    logout(state) {
      state.loggedIn = false;
      state.user = null;
      removeUser();
    },

    editInfoUser(state, user) {
      const { email } = state.user;
      const listUser = JSON.parse(localStorage.getItem('registeredUser'));

      const index = listUser.findIndex((item) => item.email === email);

      const newUser = {
        ...listUser[index],
        ...user,
      };

      listUser[index] = newUser;

      console.log(newUser, listUser);

      localStorage.setItem('registeredUser', JSON.stringify(listUser));

      state.user = user;
      editUser(user);
    },

    //  cart
    addCart(state, product) {
      console.log({ product });
      const { id } = product;
      const index = state.carts.findIndex((item) => item.id === id);
      if (index === -1) {
        state.carts.push({
          ...product,
          quantity: 1,
        });
      } else {
        state.carts[index].quantity += 1;
      }

      localStorage.setItem('carts', JSON.stringify(state.carts));
    },
    deleteCart(state, id) {
      state.carts = state.carts.filter((item) => item.id !== id);
      localStorage.setItem('carts', JSON.stringify(state.carts));
    },
    minusCart(state, id) {
      const index = state.carts.findIndex((item) => item.id === id);
      if (index === -1) {
        return;
      }
      const newCart = {
        ...state.carts[index],
      };
      if (newCart.quantity === 1) {
        state.carts.splice(index, 1);
      } else {
        const newQuantity = newCart.quantity - 1;
        state.carts[index] = {
          ...newCart,
          quantity: newQuantity,
        };
      }
      localStorage.setItem('carts', JSON.stringify(state.carts));
    },
    deleteAllCart(state) {
      state.carts = [];
      localStorage.removeItem('carts');
    },

    storedPaymentHistory(state, paymentHistory) {
      state.paymentHistory = paymentHistory;
      localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));
    },

    getPamentHistory(state) {
      state.paymentHistory = paymentHistoryByEmail(state.user.email);
    },

    getCarts(state) {
      state.carts = getCartsByEmail(state.user?.email);
    },
  },
  actions: {
    performLogin({ commit }, user) {
      // Simulate an asynchronous login request
      setTimeout(() => {
        commit('setLoggedIn', true);
        commit('setUser', user);
      }, 1000);
    },
    logout({ commit }) {
      commit('setLoggedIn', false);
      commit('setUser', null);
    },
  },
  getters: {
    getCarts(state) {
      return state.carts;
    },
  },
});

export default store;
