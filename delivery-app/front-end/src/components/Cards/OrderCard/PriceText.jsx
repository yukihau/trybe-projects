import React from 'react';
import { number, string } from 'prop-types';

function PriceText(props) {
  const { id, price } = props;
  const priceString = Number(price).toFixed(2).toString().replace('.', ',');

  return (
    <div className="price-text">
      <span>
        R$:
        {' '}
      </span>
      <span
        data-testid={ `customer_orders__element-card-price-${id}` }
      >
        { priceString }
      </span>
    </div>
  );
}

PriceText.propTypes = {
  id: number.isRequired,
  price: string.isRequired,
};

export default PriceText;
