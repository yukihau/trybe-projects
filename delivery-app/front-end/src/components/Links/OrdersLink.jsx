import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function OrdersLink() {
  const { pathname } = useLocation();
  const pathClass = pathname === '/seller/orders' && 'is-page';
  const className = `my-orders-link-btn ${pathClass}`;

  return (
    <Link to="/seller/orders">
      <button
        type="button"
        className={ className }
      >
        Pedidos
      </button>
    </Link>
  );
}

export default OrdersLink;
