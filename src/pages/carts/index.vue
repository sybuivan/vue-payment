<template>
  <div v-if="carts.length > 0">
    <div class="cart">
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
          "
        >
          <p>Your Cart</p>
          <p style="font-weight: 600">Total Price: {{ totalPrice }}</p>
        </div>
        <button class="btn-clear" @click="handleDeleteCartAll">
          Clear all
        </button>
      </div>
      <ul class="cart-box">
        <li>Image</li>
        <li>Name product</li>
        <li>Price</li>
        <li>Quantity</li>
        <li>Action</li>
      </ul>
      <ul class="cart-items">
        <li v-for="(item, index) in carts" :key="index" class="cart-item">
          <div style="flex: 0.3">
            <img :src="item.image" :alt="item.nameProduct" class="cart-image" />
          </div>
          <span class="item-name">{{ item.nameProduct }}</span>
          <span class="item-price">{{ item.price }}</span>
          <div style="flex: 0.3; display: flex; gap: 15px; align-items: center">
            <div style="display: flex" @click="handleMinusCart(item.id)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
                />
              </svg>
            </div>
            <span style="font-weight: 600">{{ item.quantity }}</span>
            <div style="display: flex" @click="handleAddToCart(item)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                />
              </svg>
            </div>
          </div>
          <div style="flex: 0.3" @click="handleDeleteCart(item.id)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
              />
            </svg>
          </div>
        </li>
      </ul>
      <div style="display: flex; justify-content: flex-end">
        <button @click="$router.push('/checkout')" class="checkout-btn">
          Checkout
        </button>
      </div>
    </div>
  </div>

  <div v-else style="margin-top: 10px">
    <p style="text-align: center">Cart is empty</p>
    <div style="display: flex; margin-top: 10px; justify-content: center">
      <button
        @click="$router.push('/home')"
        class="checkout-btn"
        style="text-align: center"
      >
        Go to home
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import { calculateTotalPrice } from '../../utils/common';
export default {
  computed: {
    ...mapState(['carts', 'loggedIn']),
    totalPrice() {
      return calculateTotalPrice(this.carts);
    },
  },
  methods: {
    ...mapMutations(['deleteCart', 'deleteAllCart', 'addCart', 'minusCart']),
    handleDeleteCart(id) {
      this.deleteCart(id);
    },

    handleDeleteCartAll() {
      this.deleteAllCart();
    },
    handleAddToCart(product) {
      this.addCart(product);
    },
    handleMinusCart(product) {
      this.minusCart(product);
    },
  },
  mounted() {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (!this.loggedIn) {
      // Chưa đăng nhập, chuyển hướng đến trang đăng nhập
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
.cart {
  padding: 20px;
  width: 100%;
}
.btn-clear {
  background: crimson;
  margin-left: 10px;
  color: #fff;
}

h2 {
  font-size: 24px;
}
.cart-box {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  list-style-type: none;
}

svg {
  width: 18px;
  cursor: pointer;
}

.cart-box li {
  flex: 0.3;
  font-weight: 600;
}

.cart-items {
  list-style-type: none;
  padding: 0;
}
.cart-image {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}
.cart-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.item-name {
  flex: 0.3;
  font-weight: bold;
}

.item-price {
  flex: 0.3;
  font-size: 14px;
}

.checkout-btn {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.checkout-btn:hover {
  background-color: #45a049;
}
</style>
