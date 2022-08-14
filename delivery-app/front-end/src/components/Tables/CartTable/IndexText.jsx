import React from 'react';
import { number } from 'prop-types';

function IndexText(props) {
  const { index } = props;
  return (
    <td>
      <h1
        className="table-index"
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        { index + 1 }
      </h1>
    </td>
  );
}

IndexText.propTypes = {
  index: number.isRequired,
};

export default IndexText;
