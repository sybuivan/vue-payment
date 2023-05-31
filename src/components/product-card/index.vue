<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.name" class="product-image" />
    <h3 class="product-name">{{ product.nameProduct }}</h3>
    <p class="product-price">{{ formatCurrency(product.price) }}</p>
    <button class="add-to-cart-button" @click="handleAddToCart(product)">
      Add to Cart
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(['loggedIn', 'user']),
  },
  methods: {
    ...mapMutations(['addCart']),
    handleAddToCart(product) {
      if (this.loggedIn) {
        this.addCart({
          ...product,
          email: this.user.email,
        });
        alert('Add cart successfully');
      } else {
        this.$router.push('/login');
      }
    },
    formatCurrency(price) {
      return `$${price.toFixed(2)}`;
    },
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  text-align: center;
  width: 24%;
}

.product-image {
  width: 100%;
  margin-bottom: 10px;
  height: 200px;
}

.product-name {
  font-size: 18px;
}
.add-to-cart-button {
  background: #4caf50;
  color: #fff;
}
</style>
