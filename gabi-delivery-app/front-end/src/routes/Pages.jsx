import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Login, CustomerProducts, Register } from '../pages';

function Pages() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/customer/products" element={ <CustomerProducts /> } />
    </Routes>
  );
}

export default Pages;
