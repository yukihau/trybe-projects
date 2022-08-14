import React from 'react';
import { Link } from 'react-router-dom';

function MyOrdersLink() {
  return (
    <Link to="/customer/orders">
      <button
        type="button"
        id="my-orders-link-btn"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Meus Pedidos
      </button>
    </Link>
  );
}

export default MyOrdersLink;
