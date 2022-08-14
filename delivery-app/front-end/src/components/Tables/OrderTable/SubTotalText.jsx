import React from 'react';
import { number, string } from 'prop-types';

function SubTotalText(props) {
  const { index, subTotal, testIdPrefix } = props;
  const priceString = Number(subTotal).toFixed(2).toString().replace('.', ',');
  return (
    <td>
      <h1
        className="table-quantity"
        data-testid={ `${testIdPrefix}element-order-table-sub-total-${index}` }
      >
        { priceString }
      </h1>
    </td>
  );
}

SubTotalText.propTypes = {
  index: number.isRequired,
  subTotal: string.isRequired,
  testIdPrefix: string.isRequired,
};

export default SubTotalText;
