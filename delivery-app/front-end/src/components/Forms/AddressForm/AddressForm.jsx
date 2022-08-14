import React from 'react';
import SellerSelect from './SellerSelect';
import AddressInput from './AddressInput';
import AddressNumberInput from './AddressNumberInput';
import '../../../css/adressForm.css';

function AddressForm() {
  return (
    <form className="address-form">
      <SellerSelect />
      <AddressInput />
      <AddressNumberInput />
    </form>
  );
}

export default AddressForm;
