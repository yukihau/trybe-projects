import React from 'react';
import { func, number } from 'prop-types';

function AddButton(props) {
  const { onClick, id } = props;

  return (
    <button
      data-testid={ `customer_products__button-card-add-item-${id}` }
      type="button"
      className="add-btn"
      onClick={ onClick }
    >
      +
    </button>
  );
}

AddButton.propTypes = {
  onClick: func.isRequired,
  id: number.isRequired,
};

export default AddButton;
