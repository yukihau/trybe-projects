import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchFromDb, { GENERIC_ERROR_MESSAGE } from '../helpers/fetch';
import payloads from '../helpers/payloads';
import helper from '../helpers/helper';
import storage from '../helpers/storage';

const INITIAL_STATE = {
  apiStatus: 'Loading...',
  apiIsLoading: true,
};

const INITIAL_ADDRESS = {
  sellerId: '',
  deliveryAddress: '',
  deliveryNumber: '',
};

function AppProvider({ children }) {
  const [appState, setAppState] = useState(INITIAL_STATE);

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [address, setAddress] = useState(INITIAL_ADDRESS);

  const getCart = () => {
    const storedCart = storage.cart.get();
    const newTotalPrice = storedCart
      ? helper.getTotalPrice(storedCart)
      : 0.0;

    setCart(storedCart || []);
    setTotalPrice(newTotalPrice);
  };

  const fetchProducts = async () => {
    const token = storage.user.token.get();
    if (!token) return false;

    const payload = payloads.createGet(token);
    const response = await fetchFromDb(payload, 'products');
    if (!response.success) return false;

    setProducts(response.json);
    return true;
  };

  const fetchSellers = async () => {
    const payload = payloads.createGet();
    const response = await fetchFromDb(payload, 'users');
    if (!response.success) return false;

    const newSellers = response.json.filter((user) => user.role === 'seller');

    setSellers(newSellers);
    return true;
  };

  const fetchAll = async () => {
    const productFetchSuccess = await fetchProducts();
    const sellerFetchSuccess = await fetchSellers();

    if (!productFetchSuccess || !sellerFetchSuccess) {
      return setAppState((s) => ({
        ...s,
        apiStatus: GENERIC_ERROR_MESSAGE,
      }));
    }

    return setAppState((s) => ({
      ...s,
      apiIsLoading: false,
    }));
  };

  const resetAddress = () => setAddress(INITIAL_ADDRESS);

  useEffect(() => {
    getCart();
    fetchAll();
  // eslint-disable-next-line
  }, []);

  return (
    <AppContext.Provider
      value={ {
        appState,
        setAppState,
        cart,
        setCart,
        getCart,
        totalPrice,
        setTotalPrice,
        products,
        setProducts,
        fetchProducts,
        sellers,
        setSellers,
        fetchSellers,
        address,
        setAddress,
        fetchAll,
        resetAddress,
      } }
    >
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
