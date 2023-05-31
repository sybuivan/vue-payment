<template>
  <div class="transaction-box">
    <h2 class="transaction-title">Payment history</h2>

    <div v-if="paymentHistory.length > 0">
      <div
        v-for="(item, index) in paymentHistory"
        :key="index"
        class="payment-item"
      >
        <div><strong>Email:</strong> {{ item.email }}</div>
        <div><strong>Total price:</strong> {{ item.totalPrice }}</div>
        <div><strong>Payment method:</strong> {{ item.paymentMethod }}</div>
        <div>
          <button
            :class="{
              'btn-view': true,
              active: selected === index,
            }"
            @click="handleOpenDetail(index)"
          >
            View details
          </button>
        </div>

        <ul
          :class="{
            'payment-items': true,
            active: selected === index,
          }"
        >
          <li
            v-for="(item, index) in item.carts"
            :key="index"
            class="payment-detail-item"
          >
            <div>
              <img
                :src="item.image"
                :alt="item.nameProduct"
                class="payment-image"
              />
            </div>
            <div>
              <p class="item-name">{{ item.nameProduct }}</p>
              <p class="item-price">
                Price: {{ item.price }} - Quantity: {{ item.quantity }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-else style="margin-top: 10px">
      <p>Payment history is empty</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      selected: null,
    };
  },

  mounted() {
    this.getPamentHistory;
  },
  computed: {
    ...mapState(['carts', 'paymentHistory']),
    ...mapMutations(['getPamentHistory']),
  },

  methods: {
    handleOpenDetail(index) {
      this.selected = index;
    },
  },
};
</script>

<style>
.transaction-box {
  width: 60%;
  margin: auto;
}
.transaction-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.payment-items {
  margin-top: 10px;
  padding: 0;
  display: none;
}
.payment-items.active {
  display: block;
}

.payment-item {
  border-bottom: 1px solid #c1c1c1;
  padding: 10px 0;
}

.payment-detail-item {
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #c1c1c1;
}

.payment-detail-item:last-child {
  border-bottom: none;
}

.payment-image {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
strong {
  font-weight: 600;
}

.btn-view.active {
  background: #45a049;
  color: #fff;
}
.btn-view:hover {
  background-color: #45a049;
  color: #fff;
}
.btn-view {
  padding: 5px 10px;
}
</style>
