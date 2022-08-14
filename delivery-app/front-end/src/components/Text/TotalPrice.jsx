import React from 'react';
import { string, number } from 'prop-types';

function TotalPrice(props) {
  const { total, testIdPrefix } = props;

  const stringTotal = total.toFixed(2).toString().replace('.', ',');
  const testId = `${testIdPrefix}element-order-total-price`;

  return (
    <h1 className="totalPrice">
      Total:
      {' '}
      R$
      {' '}
      <span data-testid={ testId }>
        { stringTotal }
      </span>
    </h1>
  );
}

TotalPrice.propTypes = {
  total: number.isRequired,
  testIdPrefix: string.isRequired,
};

export default TotalPrice;
