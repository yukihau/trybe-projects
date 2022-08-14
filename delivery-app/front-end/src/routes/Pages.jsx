import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
  Login,
  Register,
  CustomerCheckout,
  CustomerProducts,
  CustomerOrders,
  CustomerOrdersDetails,
  SellerOrders,
  SellerOrdersDetails,
} from '../pages';

function Pages() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/customer/products" element={ <CustomerProducts /> } />
      <Route exact path="/customer/checkout" element={ <CustomerCheckout /> } />
      <Route exact path="/customer/orders" element={ <CustomerOrders /> } />
      <Route
        exact
        path="/customer/orders/:orderId"
        element={ <CustomerOrdersDetails /> }
      />
      <Route exact path="/seller/orders" element={ <SellerOrders /> } />
      <Route exact path="/seller/orders/:orderId" element={ <SellerOrdersDetails /> } />
    </Routes>
  );
}

export default Pages;
