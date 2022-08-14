import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import CartButton from '../Buttons/CartButton';

function Footer() {
  const [toCheckout, setToCheckout] = useState(false);
  const { totalPrice } = useContext(AppContext);

  const totalPriceIsZero = () => totalPrice === 0;
  const submitCheckoutRedirect = () => setToCheckout(true);

  return (
    <footer className="customer-products-footer">
      { toCheckout && <Navigate to="/customer/checkout" /> }
      <CartButton
        total={ totalPrice }
        disabled={ totalPriceIsZero() }
        onClick={ submitCheckoutRedirect }
      />
    </footer>
  );
}

export default Footer;
