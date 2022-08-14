import React from 'react';
import { func, number } from 'prop-types';

function RemoveButton(props) {
  const { onClick, id } = props;

  return (
    <button
      data-testid={ `customer_products__button-card-rm-item-${id}` }
      type="button"
      className="remove-btn"
      onClick={ onClick }
    >
      -
    </button>
  );
}

RemoveButton.propTypes = {
  onClick: func.isRequired,
  id: number.isRequired,
};

export default RemoveButton;
