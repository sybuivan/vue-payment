<template>
  <div class="product-list">
    <ProductCard
      v-for="product in dataProduct"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

import ProductCard from '../../components/product-card/index.vue';
import { dataProduct } from './data';

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      dataProduct,
    };
  },
  mounted() {
    this.getCarts;
  },
  computed: {
    ...mapMutations(['getCarts']),
    ...mapGetters(['getCarts']),
  },
  methods: {
    addToCart(product) {},
    formatCurrency(price) {
      return `$${price.toFixed(2)}`;
    },
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  gap: 10px;
  margin: 20px;
  flex-wrap: wrap;
}
</style>
