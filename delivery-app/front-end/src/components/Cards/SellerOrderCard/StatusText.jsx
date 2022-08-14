import React from 'react';
import { number, string } from 'prop-types';

function StatusText(props) {
  const { id, status } = props;

  const formattedStatus = status.toLowerCase().replace(' ', '');
  const className = `status-text ${formattedStatus}`;

  return (
    <div className={ className }>
      <span
        data-testid={ `seller_orders__element-delivery-status-${id}` }
      >
        { status }
      </span>
    </div>
  );
}

StatusText.propTypes = {
  id: number.isRequired,
  status: string.isRequired,
};

export default StatusText;
