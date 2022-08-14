import React from 'react';
import { number, string } from 'prop-types';

function IndexText(props) {
  const { index, testIdPrefix } = props;
  return (
    <td>
      <h1
        className="table-index"
        data-testid={ `${testIdPrefix}element-order-table-item-number-${index}` }
      >
        { index + 1 }
      </h1>
    </td>
  );
}

IndexText.propTypes = {
  index: number.isRequired,
  testIdPrefix: string.isRequired,
};

export default IndexText;
