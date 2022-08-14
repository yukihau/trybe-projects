import React from 'react';
import { number } from 'prop-types';

function QuantityText(props) {
  const { index, quantity } = props;
  return (
    <td>
      <h1
        className="table-quantity"
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        { quantity }
      </h1>
    </td>
  );
}

QuantityText.propTypes = {
  index: number.isRequired,
  quantity: number.isRequired,
};

export default QuantityText;
