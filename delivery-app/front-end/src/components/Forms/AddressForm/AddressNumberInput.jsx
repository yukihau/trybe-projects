import React, { useContext } from 'react';
import AppContext from '../../../context/AppContext';

function AddressNumberInput() {
  const { address, setAddress } = useContext(AppContext);

  const setDeliveryNumber = (event) => {
    const { value } = event.target;

    setAddress({ ...address, deliveryNumber: value });
  };

  return (
    <label htmlFor="address-number-input">
      <input
        id="address-number-input"
        data-testid="customer_checkout__input-addressNumber"
        placeholder="Número"
        autoComplete="on"
        value={ address.deliveryNumber }
        onChange={ setDeliveryNumber }
      />
    </label>
  );
}

export default AddressNumberInput;
