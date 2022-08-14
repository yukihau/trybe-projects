import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function MyOrdersLink() {
  const { pathname } = useLocation();
  const pathClass = pathname === '/customer/orders' && 'is-page';
  const className = `products-link-btn ${pathClass}`;

  return (
    <Link to="/customer/orders">
      <button
        type="button"
        className={ className }
        data-testid="customer_products__element-navbar-link-orders"
      >
        Meus Pedidos
      </button>
    </Link>
  );
}

export default MyOrdersLink;
