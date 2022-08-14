import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../../components/Headers/CustomerHeader';
import OrderDetails from '../../../components/Main/OrderDetails';
import AppContext from '../../../context/AppContext';
import storage from '../../../helpers/storage';

function CustomerOrdersDetails() {
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
      <OrderDetails />
    </div>
  );
}

export default CustomerOrdersDetails;
