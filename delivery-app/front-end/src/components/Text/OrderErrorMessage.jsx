import React from 'react';
import { bool, string } from 'prop-types';

function OrderErrorMessage(props) {
  const { hidden, error } = props;
  return (
    <div
      className="orderError"
      id="error-message"
      hidden={ hidden }
    >
      { error }
    </div>
  );
}

OrderErrorMessage.propTypes = {
  hidden: bool.isRequired,
  error: string.isRequired,
};

export default OrderErrorMessage;
