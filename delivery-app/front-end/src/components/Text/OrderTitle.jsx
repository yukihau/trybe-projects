import React from 'react';
import { number, string } from 'prop-types';
import helper from '../../helpers/helper';

function OrderTitle(props) {
  const { id, seller } = props;
  const formattedId = helper.formatNumberIntoLengthOf4(id);

  return (
    <div className="details-title">
      <div className="order-id">
        PEDIDO
        {' '}
        <span data-testid="customer_order_details__element-order-details-label-order-id">
          { formattedId }
        </span>
        ;
      </div>
      <div>
        <span>
          P.Vend:
          {' '}
        </span>
        <span
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          { seller }
        </span>
      </div>
    </div>
  );
}

OrderTitle.propTypes = {
  id: number.isRequired,
  seller: string.isRequired,
};

export default OrderTitle;
