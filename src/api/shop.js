const _products = [
  {
    id: 1,
    title: "iPad 4 Mini",
    price: 500.01,
    inventory: 2,
    description: "Новенький планшет",
    imgUrl:
      "https://nn.wadoo.ru/upload/iblock/6af/6af88e94686b2557c0ba7ed302337588.jpg",
  },
  {
    id: 2,
    title: "H&M T-Shirt White",
    price: 10.99,
    inventory: 10,
    description: "Новенькая футболка",
    imgUrl:
      "https://i.pinimg.com/736x/5b/a8/f0/5ba8f0f8893a72cc4497a0ca2720808a.jpg",
  },
  {
    id: 3,
    title: "Iphone 8 plus",
    price: 200.99,
    inventory: 5,
    description: "Новенький телефон",
    imgUrl:
      "https://3gstore.ru/upload/iblock/ab3/ab32c635c7120adbbed2b14e5d1d4945.jpg",
  },
];

export default {
  getProducts(cb) {
    setTimeout(() => cb(_products), 100);
  },

  buyProducts(products, cb, errorCb) {
    setTimeout(() => {
      Math.random() > 0.5 || navigator.webdriver ? cb() : errorCb();
    }, 100);
  },
};
