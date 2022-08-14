import React from 'react';
import { Link } from 'react-router-dom';

function ProductsLink() {
  return (
    <Link to="/customer/products">
      <button
        type="button"
        id="products-link-btn"
        data-testid="customer_products__element-navbar-link-products"
      >
        Produtos
      </button>
    </Link>
  );
}

export default ProductsLink;
