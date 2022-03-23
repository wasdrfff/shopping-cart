<template>
  <div>
    <h2
      v-on:click="toggleOpen"
      v-bind:class="['cart-component__order-button', { disabled: isEmptyCart }]"
    >
      Заказать
    </h2>
    <div class="cart-wrapper" v-if="isOpen" v-on:click="toggleOpen">
      <div class="cart" v-on:click="$event.stopPropagation()">
        <h1>Твоя корзина</h1>
        <ul>
          <li v-for="product in cart" :key="product.id">
            <img :src="product.imgUrl" width="100" height="100" />
            {{ product.title }}{{ " " }}{{ product.price }}{{ " " }} кол-во ({{
              product.quantity
            }})
            <button v-on:click="removeProductFromCart(product, $event)">
              Удалить из корзины
            </button>
          </li>
        </ul>
        <h2>Итоговая стоимость:{{ totalPrice }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      isOpen: false,
    };
  },

  computed: {
    products() {
      return this.$store.getters.availableProducts;
    },
    cart() {
      return this.$store.getters.productsInCart;
    },
    totalPrice() {
      return this.$store.getters.totalPrice;
    },
    isEmptyCart() {
      return this.cart.length === 0;
    },
  },

  methods: {
    removeProductFromCart(product, event) {
      event.stopPropagation();
      this.$store.dispatch("removeProductFromCart", product);
    },
    toggleOpen(e) {
      e.stopPropagation();
      this.isOpen = !this.isOpen && !this.isEmptyCart;
    },
  },

  created() {
    this.loading = true;
    this.$store.dispatch("fetchProducts").then(() => (this.loading = false));
  },
};
</script>
<style>
.cart-component__order-button:hover {
  color: gray;
  cursor: pointer;
}
.cart-component__order-button.disabled {
  color: lightgray;
}

.cart {
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 40px;
  background-color: gray;
}
.cart-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
