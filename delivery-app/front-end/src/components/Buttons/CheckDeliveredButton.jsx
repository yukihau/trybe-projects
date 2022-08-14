import React from 'react';
import { func, string } from 'prop-types';

function CheckDeliveredButton(props) {
  const { onClick, status } = props;

  const isDisabled = status !== 'Em Trânsito';

  return (
    <button
      type="button"
      id="register-btn"
      data-testid="customer_order_details__button-delivery-check"
      onClick={ onClick }
      disabled={ isDisabled }
      className="check-delivered-btn"
    >
      MARCAR COMO ENTREGUE
    </button>
  );
}

CheckDeliveredButton.propTypes = {
  onClick: func.isRequired,
  status: string.isRequired,
};

export default CheckDeliveredButton;
