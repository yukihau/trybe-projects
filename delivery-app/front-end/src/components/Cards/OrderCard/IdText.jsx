import React from 'react';
import { number } from 'prop-types';
import helper from '../../../helpers/helper';

function IdText(props) {
  const { id } = props;
  const formattedId = helper.formatNumberIntoLengthOf4(id);

  return (
    <div className="id-text">
      <span className="id-title">Pedido</span>
      <span
        data-testid={ `customer_orders__element-order-id-${id}` }
        className="id"
      >
        { formattedId }
      </span>
    </div>
  );
}

IdText.propTypes = {
  id: number.isRequired,
};

export default IdText;
