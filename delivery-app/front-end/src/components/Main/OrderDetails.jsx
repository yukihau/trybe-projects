// General
import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWithParams } from '../../helpers/fetch';
import payloads from '../../helpers/payloads';
// Order Components
import LoadingText from '../Text/LoadingText';
import { OrderTable } from '../Tables';
import TotalPrice from '../Text/TotalPrice';
import OrderTitle from '../Text/OrderTitle';
import OrderDate from '../Text/OrderDate';
import DeliveryStatus from '../Text/DeliveryStatus';
import CheckDeliveredButton from '../Buttons/CheckDeliveredButton';
import OrderErrorMessage from '../Text/OrderErrorMessage';
import AppContext from '../../context/AppContext';
import '../../css/checkout.css';

const INITIAL_STATE = {
  id: 0,
  total: 0.0,
  seller: '',
  date: '',
  status: '',
  products: [],
  orderIsLoaded: false,
  errorHidden: true,
  errorMessage: '',
};

function Order() {
  const [state, setState] = useState(INITIAL_STATE);

  const { orderId } = useParams();
  const { appState, sellers } = useContext(AppContext);

  const getOrder = async () => {
    const payload = payloads.createGet();
    const response = await fetchWithParams({ payload, url: 'sales', id: orderId });

    if (!response.success) {
      return setState({
        ...state,
        errorHidden: false,
        errorMessage: response.json.error,
      });
    }

    const currSeller = sellers.find((s) => s.id === response.json.sellerId);

    setState({
      ...state,
      id: response.json.id,
      total: Number(response.json.totalPrice),
      seller: currSeller.name,
      date: response.json.saleDate,
      status: response.json.status,
      products: response.json.products,
      orderIsLoaded: true,
    });
  };

  const submitDeliveryConfirmation = async () => {
    const payload = payloads.createPut({ status: 'Entregue' });
    const response = await fetchWithParams({ payload, url: 'sales', id: orderId });

    if (!response.success) {
      return setState({
        ...state,
        errorHidden: false,
        errorMessage: response.json.error,
      });
    }

    return getOrder();
  };

  // eslint-disable-next-line
  useEffect(() => getOrder(), [appState]);

  const main = (
    <div className="details">
      <div className="details-header">
        <OrderTitle
          id={ state.id }
          seller={ state.seller }
          testIdPrefix="customer_order_details__"
        />
        <OrderDate
          date={ state.date }
          testIdPrefix="customer_order_details__"
        />
        <DeliveryStatus
          status={ state.status }
          testIdPrefix="customer_order_details__"
        />
        <CheckDeliveredButton
          onClick={ submitDeliveryConfirmation }
          status={ state.status }
        />
      </div>
      <div className="details-table">
        <OrderTable
          testIdPrefix="customer_order_details__"
          products={ state.products }
        />
        <TotalPrice
          testIdPrefix="customer_order_details__"
          total={ state.total }
        />
      </div>
      <OrderErrorMessage
        hidden={ state.errorHidden }
        error={ state.errorMessage }
      />
    </div>
  );

  const renderMain = (
    state.orderIsLoaded ? main : <p>Order is loading...</p>
  );

  return (
    <main className="order-details">
      {
        appState.apiIsLoading
          ? <LoadingText text={ appState.apiStatus } />
          : renderMain
      }
    </main>
  );
}

export default Order;
