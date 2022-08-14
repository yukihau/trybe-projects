import React from 'react';
import { number, string } from 'prop-types';
import helper from '../../helpers/helper';

function OrderId(props) {
  const { id, testIdPrefix } = props;

  const formattedId = helper.formatNumberIntoLengthOf4(id);
  const testId = `${testIdPrefix}element-order-details-label-order-id`;

  return (
    <div className="details-title">
      <div className="order-id">
        PEDIDO
        {' '}
        <span data-testid={ testId }>
          { formattedId }
        </span>
      </div>
    </div>
  );
}

OrderId.propTypes = {
  id: number.isRequired,
  testIdPrefix: string.isRequired,
};

export default OrderId;
