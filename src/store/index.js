import Vuex from "vuex";
import Vue from "vue";
import shop from "@/api/shop";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
  },
  getters: {
    availableProducts(state) {
      return state.products.filter((product) => product.inventory > 0);
    },
    productsInCart(state) {
      return state.cart;
    },
    totalPrice(state) {
      return state.cart.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);
    },
  },
  actions: {
    fetchProducts({ commit }) {
      return new Promise((resolve) => {
        shop.getProducts((products) => {
          commit("setProducts", products);
          resolve();
        });
      });
    },

    addProductToCart(context, product) {
      if (product.inventory > 0) {
        const cartItem = context.state.cart.find(
          (item) => item.id === product.id
        );

        if (!cartItem) {
          context.commit("pushProductToCart", product);
        } else {
          context.commit("incrementItemQuantity", cartItem);
        }

        context.commit("decrementProductInvetory", product);
      }
    },
    removeProductFromCart(context, cartProduct) {
      if (cartProduct.quantity > 0) {
        const productItem = context.state.products.find(
          (p) => p.id === cartProduct.id
        );
        if (cartProduct.quantity > 1) {
          context.commit("decrementCartQuantity", cartProduct);
        } else {
          context.commit("removeProductFromCart", cartProduct);
        }
        context.commit("incrementProductInvetory", productItem);
      }
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    pushProductToCart(state, product) {
      state.cart.push({
        id: product.id,
        quantity: 1,
        imgUrl: product.imgUrl,
        title: product.title,
        price: product.price,
      });
    },
    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },
    decrementProductInvetory(state, product) {
      product.inventory--;
    },
    incrementProductInvetory(state, product) {
      product.inventory++;
    },
    decrementCartQuantity(state, cartProduct) {
      cartProduct.quantity--;
    },
    removeProductFromCart(state, cartProduct) {
      state.cart = state.cart.filter((p) => p.id !== cartProduct.id);
    },
  },
});
