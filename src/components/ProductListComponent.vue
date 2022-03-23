<template>
  <div class="product-list">
    <div class="product-list__header">
      <span>Product List</span>
      <CartComponent />
    </div>
    <img v-if="loading" />
    <ul v-else>
      <li
        v-for="product in products"
        :key="product.id"
        class="product-list__product"
      >
        <img :src="product.imgUrl" width="100" height="100" />
        {{ product.title }}{{ " " }}{{ product.price }} кол-во({{
          product.inventory
        }}){{ " " }}{{ product.description }}
        <button
          @click="addProductToCart(product)"
          class="product-list__button-ordering"
        >
          Добавить в корзину
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import CartComponent from "./CartComponent";

export default {
  components: {
    CartComponent,
  },
  data() {
    return {
      loading: false,
    };
  },

  computed: {
    products() {
      return this.$store.getters.availableProducts;
    },
    cart() {
      return this.$store.getters.productsInCart;
    },
  },

  methods: {
    addProductToCart(product) {
      this.$store.dispatch("addProductToCart", product);
    },
  },

  created() {
    this.loading = true;
    this.$store.dispatch("fetchProducts").then(() => (this.loading = false));
  },
};
</script>
<style>
.product-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product-list__product:hover {
  box-shadow: 2px 2px 4px 4px gray;
}

.product-list__product {
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 12px;
  justify-content: space-between;
  padding: 12px;
}
.product-list__button-ordering {
  cursor: pointer;
}
</style>
