// General
import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWithParams } from '../../helpers/fetch';
import payloads from '../../helpers/payloads';
// Order Components
import LoadingText from '../Text/LoadingText';
import { OrderTable } from '../Tables';
import TotalPrice from '../Text/TotalPrice';
import OrderId from '../Text/OrderId';
import OrderDate from '../Text/OrderDate';
import DeliveryStatus from '../Text/DeliveryStatus';
import CheckPreparingButton from '../Buttons/CheckPreparingButton';
import CheckDispatchButton from '../Buttons/CheckDispatchButton';
import OrderErrorMessage from '../Text/OrderErrorMessage';
import AppContext from '../../context/AppContext';

const INITIAL_STATE = {
  id: 0,
  total: 0.0,
  date: '',
  status: '',
  products: [],
  orderIsLoaded: false,
  errorHidden: true,
  errorMessage: '',
};

function SellerOrderDetails() {
  const [state, setState] = useState(INITIAL_STATE);

  const { orderId } = useParams();
  const { appState } = useContext(AppContext);

  const getOrder = async () => {
    const payload = payloads.createGet();
    const response = await fetchWithParams({ payload, url: 'sales', id: orderId });
    console.log(orderId);

    if (!response.success) {
      return setState({
        ...state,
        errorHidden: false,
        errorMessage: response.json.error,
      });
    }

    setState({
      ...state,
      id: response.json.id,
      total: Number(response.json.totalPrice),
      date: response.json.saleDate,
      status: response.json.status,
      products: response.json.products,
      orderIsLoaded: true,
    });
  };

  const submitPreparingStatus = async () => {
    const payload = payloads.createPut({ status: 'Preparando' });
    const response = await fetchWithParams({ payload, url: 'sales', id: orderId });

    if (!response.success) {
      return setState({
        ...state,
        errorHidden: false,
        errorMessage: response.json.error,
      });
    }

    getOrder();
  };

  const submitDispatchedStatus = async () => {
    const payload = payloads.createPut({ status: 'Em Trânsito' });
    const response = await fetchWithParams({ payload, url: 'sales', id: orderId });

    if (!response.success) {
      return setState({
        ...state,
        errorHidden: false,
        errorMessage: response.json.error,
      });
    }

    getOrder();
  };

  // eslint-disable-next-line
  useEffect(() => getOrder(), []);

  const main = (
    <div className="details">
      <div className="details-header">
        <OrderId
          id={ state.id }
          testIdPrefix="seller_order_details__"
        />
        <OrderDate
          date={ state.date }
          testIdPrefix="seller_order_details__"
        />
        <DeliveryStatus
          status={ state.status }
          testIdPrefix="seller_order_details__"
        />
        <CheckPreparingButton
          onClick={ submitPreparingStatus }
          status={ state.status }
        />
        <CheckDispatchButton
          onClick={ submitDispatchedStatus }
          status={ state.status }
        />
      </div>
      <div className="details-table">
        <OrderTable
          testIdPrefix="seller_order_details__"
          products={ state.products }
        />
        <TotalPrice
          testIdPrefix="seller_order_details__"
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

export default SellerOrderDetails;
