import React from 'react';
import { func, number } from 'prop-types';

function RemoveButton(props) {
  const { onClick, index } = props;
  return (
    <td>
      <button
        type="button"
        className="table-remove-btn"
        data-testid={ `customer_checkout__element-order-table-remove-${index}` }
        onClick={ onClick }
      >
        Remover
      </button>
    </td>
  );
}

RemoveButton.propTypes = {
  onClick: func.isRequired,
  index: number.isRequired,
};

export default RemoveButton;
