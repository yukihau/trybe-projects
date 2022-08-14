import React from 'react';
import { func } from 'prop-types';

function FinishOrderButton(props) {
  const { onClick } = props;

  return (
    <button
      type="button"
      id="finish-order-button"
      data-testid="customer_checkout__button-submit-order"
      onClick={ onClick }
    >
      Finalizar Pedido
    </button>
  );
}

FinishOrderButton.propTypes = {
  onClick: func.isRequired,
};

export default FinishOrderButton;
