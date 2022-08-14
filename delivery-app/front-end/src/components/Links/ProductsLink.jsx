import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function ProductsLink() {
  const { pathname } = useLocation();
  const pathClass = pathname === '/customer/products' && 'is-page';
  const className = `products-link-btn ${pathClass}`;

  return (
    <Link to="/customer/products">
      <button
        type="button"
        className={ className }
        data-testid="customer_products__element-navbar-link-products"
      >
        Produtos
      </button>
    </Link>
  );
}

export default ProductsLink;
