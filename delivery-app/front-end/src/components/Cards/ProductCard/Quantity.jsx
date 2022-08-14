import React from 'react';
import { func, number } from 'prop-types';

function Quantity(props) {
  const { quantity, onChange, id } = props;

  return (
    <input
      className="quantity-input"
      data-testid={ `customer_products__input-card-quantity-${id}` }
      type="text"
      value={ quantity }
      onChange={ onChange }
    />
  );
}

Quantity.propTypes = {
  quantity: number.isRequired,
  onChange: func.isRequired,
  id: number.isRequired,
};

export default Quantity;
