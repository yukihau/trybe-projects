import React from 'react';
import { func, string } from 'prop-types';

function CheckDispatchButton(props) {
  const { onClick, status } = props;

  const isDisabled = (
    status === 'Pendente'
    || status === 'Em Trânsito'
    || status === 'Entregue'
  );

  return (
    <button
      type="button"
      id="register-btn"
      data-testid="seller_order_details__button-dispatch-check"
      onClick={ onClick }
      disabled={ isDisabled }
      className="check-dispatch-btn"
    >
      SAIU PARA ENTREGA
    </button>
  );
}

CheckDispatchButton.propTypes = {
  onClick: func.isRequired,
  status: string.isRequired,
};

export default CheckDispatchButton;
