<template>
  <div class="checkout">
    <div class="cart">
      <p class="cart-title">List product</p>
      <ul class="cart-items">
        <li v-for="(item, index) in carts" :key="index" class="cart-item">
          <div style="flex: 0.3">
            <img :src="item.image" :alt="item.nameProduct" class="cart-image" />
          </div>
          <div>
            <p class="item-name">{{ item.nameProduct }}</p>
            <p class="item-price">Price: {{ item.price }}</p>
            <div
              style="flex: 0.3; display: flex; gap: 15px; align-items: center"
            >
              <span style="font-weight: 600"
                >Quantity: {{ item.quantity }}</span
              >
            </div>
          </div>
        </li>
      </ul>
      <p style="font-weight: 600; text-align: end">
        Total Price: {{ totalPrice }}
      </p>
    </div>
    <div class="cart-checkout">
      <p class="cart-title">Checkout</p>
      <form @submit.prevent="processCheckout">
        <div class="form-group">
          <label for="fullName">Full name:</label>
          <input type="text" id="fullName" v-model="user.fullName" required />
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <input type="text" id="address" v-model="user.address" required />
        </div>
        <div class="form-group">
          <label for="paymentMethod">Payment Method:</label>
          <select id="paymentMethod" v-model="formData.paymentMethod" required>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import { calculateTotalPrice } from '../../utils/common';
import { editUser } from '../../utils/localStorage';

export default {
  computed: {
    ...mapState(['carts', 'user', 'loggedIn', 'paymentHistory']),
    totalPrice() {
      return calculateTotalPrice(this.carts);
    },
  },

  data() {
    return {
      formData: {
        paymentMethod: 'creditCard',
      },
    };
  },
  methods: {
    ...mapMutations(['deleteAllCart', 'editInfoUser', 'storedPaymentHistory']),
    processCheckout() {
      if (
        this.user.remainingAmount <= 0 ||
        this.user.remainingAmount < this.totalPrice ||
        !this.user.remainingAmount
      ) {
        return alert('Not enough money to pay!');
      }

      this.paymentHistory.push({
        ...this.formData,
        email: this.user.email,
        carts: this.carts,
        totalPrice: this.totalPrice,
      });

      const newAmount = this.user.remainingAmount - this.totalPrice;

      this.storedPaymentHistory(this.paymentHistory);

      const newUser = {
        ...this.user,
        remainingAmount: newAmount,
      };

      this.editInfoUser(newUser);
      this.deleteAllCart();

      alert('Payment successfully!');
      this.$router.push('/home');
    },
  },
};
</script>

<style>
.checkout {
  display: flex;
  gap: 20px;
}
.cart-title {
  font-size: 18px;
  font-weight: 600;
  padding: 10px 0;
}
.cart-box {
  display: flex;
  align-items: center;
  padding: 10px;
  list-style-type: none;
}

.cart-item {
  list-style-type: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #c1c1c1;
  padding: 10px 0;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-items {
  padding: 0;
  border-bottom: 1px solid #c1c1c1;
}
.cart-image {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}

.cart {
  width: 35%;
  padding: 10px;
}

.item-name,
.item-price {
  font-weight: 600;
}

.cart-checkout {
  width: 65%;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type='text'],
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type='submit'] {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type='submit']:hover {
  background-color: #45a049;
}
</style>
