import React from 'react';
import { number, string } from 'prop-types';

function PriceText(props) {
  const { price, id } = props;
  const priceString = Number(price).toFixed(2).toString().replace('.', ',');

  return (
    <h1 className="card-price">
      R$:
      {' '}
      <span data-testid={ `customer_products__element-card-price-${id}` }>
        { priceString }
      </span>
    </h1>
  );
}

PriceText.propTypes = {
  price: string.isRequired,
  id: number.isRequired,
};

export default PriceText;
