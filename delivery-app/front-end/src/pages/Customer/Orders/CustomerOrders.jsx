import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../../components/Headers/CustomerHeader';
import MyOrders from '../../../components/Main/MyOrders';
import AppContext from '../../../context/AppContext';
import storage from '../../../helpers/storage';
import '../../../css/orders.css';

function CustomerOrders() {
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
      <MyOrders />
    </div>
  );
}

export default CustomerOrders;
