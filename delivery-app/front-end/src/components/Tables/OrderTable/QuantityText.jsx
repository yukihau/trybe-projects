import React from 'react';
import { number, string } from 'prop-types';

function QuantityText(props) {
  const { index, quantity, testIdPrefix } = props;
  return (
    <td>
      <h1
        className="table-quantity"
        data-testid={ `${testIdPrefix}element-order-table-quantity-${index}` }
      >
        { quantity }
      </h1>
    </td>
  );
}

QuantityText.propTypes = {
  index: number.isRequired,
  quantity: number.isRequired,
  testIdPrefix: string.isRequired,
};

export default QuantityText;
