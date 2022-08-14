import React from 'react';
import { func, string } from 'prop-types';

function CheckPreparingButton(props) {
  const { onClick, status } = props;

  const isDisabled = (
    status === 'Preparando'
    || status === 'Em Trânsito'
    || status === 'Entregue'
  );

  return (
    <button
      type="button"
      id="register-btn"
      data-testid="seller_order_details__button-preparing-check"
      onClick={ onClick }
      disabled={ isDisabled }
      className="check-preparing-btn"
    >
      PREPARAR PEDIDO
    </button>
  );
}

CheckPreparingButton.propTypes = {
  onClick: func.isRequired,
  status: string.isRequired,
};

export default CheckPreparingButton;
