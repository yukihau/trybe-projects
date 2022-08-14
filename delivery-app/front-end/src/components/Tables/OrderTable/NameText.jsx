import React from 'react';
import { number, string } from 'prop-types';

function NameText(props) {
  const { index, name, testIdPrefix } = props;
  return (
    <td>
      <h1
        className="table-name"
        data-testid={ `${testIdPrefix}element-order-table-name-${index}` }
      >
        { name }
      </h1>
    </td>
  );
}

NameText.propTypes = {
  index: number.isRequired,
  name: string.isRequired,
  testIdPrefix: string.isRequired,
};

export default NameText;
