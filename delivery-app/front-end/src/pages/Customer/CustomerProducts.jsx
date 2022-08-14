import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../components/Headers/CustomerHeader';
import Footer from '../../components/Footers/Footer';
import Products from '../../components/Main/Products';
import AppContext from '../../context/AppContext';
import storage from '../../helpers/storage';
import '../../css/customer-products.css';

function CustomerProducts() {
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
      <Products />
      <Footer />
    </div>
  );
}

export default CustomerProducts;
