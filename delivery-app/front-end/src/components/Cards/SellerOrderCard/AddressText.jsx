import React from 'react';
import { number, string } from 'prop-types';

function AddressText(props) {
  const { id, deliveryAddress, deliveryNumber } = props;

  return (
    <div className="address-text">
      Endereço:
      {' '}
      <span
        data-testid={ `seller_orders__element-card-address-${id}` }
      >
        { deliveryAddress }
        ,
        {' '}
        { deliveryNumber }
      </span>
    </div>
  );
}

AddressText.propTypes = {
  id: number.isRequired,
  deliveryAddress: string.isRequired,
  deliveryNumber: string.isRequired,
};

export default AddressText;
