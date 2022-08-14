import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../components/Headers/CustomerHeader';
import Checkout from '../../components/Main/Checkout';
import AppContext from '../../context/AppContext';
import storage from '../../helpers/storage';

function CustomerCheckout() {
  const { fetchAll } = useContext(AppContext);
  const navigate = useNavigate();

  const verifyIfUserIsSeller = async () => {
    const isSeller = await storage.user.is.seller();
    if (isSeller) return navigate('/seller/orders');
  };

  useEffect(() => {
    verifyIfUserIsSeller();
    fetchAll();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <CustomerHeader />
      <Checkout />
    </div>
  );
}

export default CustomerCheckout;
