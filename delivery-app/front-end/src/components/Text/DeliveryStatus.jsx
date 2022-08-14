import React from 'react';
import { string } from 'prop-types';

function DeliveryStatus(props) {
  const { status, testIdPrefix } = props;

  const formattedStatus = status.toLowerCase().replace(' ', '');
  const className = `details-status ${formattedStatus}`;
  console.log(className);

  const testId = `${testIdPrefix}element-order-details-label-delivery-status`;

  return (
    <div className={ className }>
      <span data-testid={ testId }>
        { status }
      </span>
    </div>
  );
}

DeliveryStatus.propTypes = {
  status: string.isRequired,
  testIdPrefix: string.isRequired,
};

export default DeliveryStatus;
