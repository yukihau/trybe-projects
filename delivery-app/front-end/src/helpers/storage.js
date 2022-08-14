import helper from './helper';

const userFunctions = {
  get: async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return false;

    const userValuesAreEmpty = Object.values(user).every((value) => value === '');
    if (userValuesAreEmpty) return false;

    const currentUserDataIsValid = await helper.validateUserData(user);
    if (!currentUserDataIsValid) return false;

    return user;
  },

  set: (user) => localStorage.setItem('user', JSON.stringify(user)),

  remove: () => localStorage.removeItem('user'),

  is: {
    seller: async () => {
      const user = await userFunctions.get();
      const isSeller = user.role === 'seller';
      return isSeller;
    },
  },

  token: {
    get: () => {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user) return false;

      return user.token;
    },
  },
};

const cartFunctions = {
  get: () => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart === null) return false;

    return cart;
  },

  remove: () => localStorage.removeItem('cart'),

  product: {
    find: (id) => {
      const cart = cartFunctions.get();

      if (!cart) return false;

      const filteredCart = cart.find((cartProduct) => cartProduct.id === id);

      if (!filteredCart) return false;

      return filteredCart;
    },

    set: (product) => {
      const cart = cartFunctions.get();

      if (!cart) return localStorage.setItem('cart', JSON.stringify([product]));

      const finalCart = cart
        .map((cartProduct) => ((cartProduct.id === product.id) ? product : cartProduct));

      const productIsInCart = finalCart
        .filter((cartProduct) => cartProduct.id === product.id);

      if (productIsInCart.length === 0) finalCart.push(product);

      localStorage.setItem('cart', JSON.stringify(finalCart));
    },

    remove: (id) => {
      const cart = cartFunctions.get();

      if (!cart) return false;

      const filteredCart = cart.filter((cartProduct) => cartProduct.id !== id);

      if (filteredCart.length === 0) return localStorage.removeItem('cart');

      localStorage.setItem('cart', JSON.stringify(filteredCart));
    },
  },
};

const storage = {
  user: userFunctions,
  cart: cartFunctions,
};

export default storage;
