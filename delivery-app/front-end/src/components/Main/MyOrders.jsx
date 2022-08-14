// General
import React, { useState, useContext, useEffect } from 'react';
import fetchFromDb from '../../helpers/fetch';
import payloads from '../../helpers/payloads';
import storage from '../../helpers/storage';
// Components
import { OrderCard } from '../Cards';
import LoadingText from '../Text/LoadingText';
import AppContext from '../../context/AppContext';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { appState } = useContext(AppContext);

  const fetchOrders = async () => {
    const token = storage.user.token.get();
    if (!token) return false;

    const payload = payloads.createGet(token);
    const response = await fetchFromDb(payload, 'orders');
    if (!response.success) return false;

    setOrders(response.json);
    return true;
  };

  useEffect(() => fetchOrders(), [appState]);

  const main = (
    orders.map((order) => {
      const { id, status, saleDate, totalPrice } = order;
      return (
        <OrderCard
          key={ id }
          id={ id }
          status={ status }
          date={ saleDate }
          price={ totalPrice }
        />
      );
    })
  );

  return (
    <main className="orders-main">
      {
        appState.apiIsLoading
          ? <LoadingText text={ appState.apiStatus } />
          : main
      }
    </main>
  );
}

export default MyOrders;
