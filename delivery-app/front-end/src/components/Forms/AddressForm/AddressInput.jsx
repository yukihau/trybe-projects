import React, { useContext } from 'react';
import AppContext from '../../../context/AppContext';

function AddressInput() {
  const { address, setAddress } = useContext(AppContext);

  const setDeliveryAddress = (event) => {
    const { value } = event.target;

    setAddress({ ...address, deliveryAddress: value });
  };

  return (
    <label htmlFor="address-input">
      <input
        id="address-input"
        data-testid="customer_checkout__input-address"
        placeholder="Endereço"
        autoComplete="on"
        value={ address.deliveryAddress }
        onChange={ setDeliveryAddress }
      />
    </label>
  );
}

export default AddressInput;
