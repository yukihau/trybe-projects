// General
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import payloads from '../../helpers/payloads';
import fetchFromDb, { fetchUserId } from '../../helpers/fetch';
import storage from '../../helpers/storage';
import AppContext from '../../context/AppContext';

// Order Components
import LoadingText from '../Text/LoadingText';
import { CartTable } from '../Tables';
import TotalPrice from '../Text/TotalPrice';
import AddressForm from '../Forms';
import FinishOrderButton from '../Buttons/FinishOrderButton';
import OrderErrorMessage from '../Text/OrderErrorMessage';
import '../../css/checkout.css';

const INITIAL_STATE = {
  errorIsHidden: true,
  fetchErrorMessage: '',
};

function Order() {
  const [state, setState] = useState(INITIAL_STATE);
  const { appState, totalPrice } = useContext(AppContext);
  const { cart, address, resetAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const total = cart.reduce((a, b) => a + (b.price * b.quantity), 0);

  const showError = async (error) => {
    setState({
      ...state,
      errorIsHidden: false,
      fetchErrorMessage: error,
    });
    return false;
  };

  const getSaleData = async () => {
    const response = await fetchUserId();

    if (!response.success) return showError(response.json.error);

    return {
      userId: response.userId,
      products: cart.map(({ id, quantity }) => ({ id, quantity })),
      totalPrice,
      ...address,
    };
  };

  const submitOrder = async () => {
    const sale = await getSaleData();
    if (!sale) return false;

    const token = await storage.user.token.get();

    const payload = payloads.createPost(sale, token);
    const response = await fetchFromDb(payload, 'checkout');

    if (!response.success) return showError(response.json.error);

    storage.cart.remove();
    resetAddress();
    return navigate(`/customer/orders/${response.json.id}`);
  };

  const main = (
    <div>
      <h1 className="titleFinalize">Finalizar Pedido</h1>
      <div className="order-div">
        <div className="CheckoutFinalize">
          <CartTable hasRemove />
          <TotalPrice
            testIdPrefix="customer_checkout__"
            total={ total }
          />
        </div>
      </div>
      <h1 className="titleDetails">Detalhes e Endereço para Entrega</h1>
      <div className="address-div">
        <div className="Checkout">
          <AddressForm />
          <FinishOrderButton
            onClick={ submitOrder }
          />
          <OrderErrorMessage
            hidden={ state.errorIsHidden }
            error={ state.fetchErrorMessage }
          />
        </div>
      </div>
    </div>
  );

  return (
    <main className="main-orders">
      {
        appState.apiIsLoading
          ? <LoadingText text={ appState.apiStatus } />
          : main
      }
    </main>
  );
}

export default Order;
