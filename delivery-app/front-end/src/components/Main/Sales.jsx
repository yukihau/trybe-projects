// General
import React, { useState, useContext, useEffect } from 'react';
import storage from '../../helpers/storage';
import fetchFromDb from '../../helpers/fetch';
import payloads from '../../helpers/payloads';
// Components
import { SellerOrderCard } from '../Cards';
import LoadingText from '../Text/LoadingText';
import AppContext from '../../context/AppContext';

function Sales() {
  const [sales, setSales] = useState([]);
  const { appState } = useContext(AppContext);

  const getSales = async () => {
    const token = storage.user.token.get();
    if (!token) return false;

    const payload = payloads.createGet(token);
    const response = await fetchFromDb(payload, 'sales');
    if (!response.success) return false;

    const { id } = await storage.user.get();
    const sellerOrders = response.json.filter((order) => order.sellerId === id);
    return setSales(sellerOrders);
  };

  // eslint-disable-next-line
  useEffect(() => getSales(), [appState]);

  const main = (
    sales.map((order) => {
      const { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = order;
      return (
        <SellerOrderCard
          key={ id }
          id={ id }
          status={ status }
          date={ saleDate }
          price={ totalPrice }
          deliveryAddress={ deliveryAddress }
          deliveryNumber={ deliveryNumber }
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

export default Sales;
