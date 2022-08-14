import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerHeader from '../../../components/Headers/SellerHeader';
import SellerOrderDetails from '../../../components/Main/SellerOrderDetails';
import AppContext from '../../../context/AppContext';
import storage from '../../../helpers/storage';

function SellerOrdersDetails() {
  const { fetchAll } = useContext(AppContext);
  const navigate = useNavigate();

  const verifyIfUserIsSeller = async () => {
    const isSeller = await storage.user.is.seller();
    if (!isSeller) return navigate('/customer/products');
  };

  useEffect(() => {
    verifyIfUserIsSeller();
    fetchAll();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <SellerHeader />
      <SellerOrderDetails />
    </div>
  );
}

export default SellerOrdersDetails;
