import React, { useContext } from 'react';
import AppContext from '../../../context/AppContext';

function SellerSelect() {
  const { sellers, setAddress } = useContext(AppContext);

  const submitSellerId = (event) => {
    const { value } = event.target;
    setAddress((address) => ({ ...address, sellerId: value }));
  };

  const main = (
    sellers.map((seller) => (
      <option key={ seller.id } value={ seller.id }>
        { seller.name }
      </option>
    ))
  );

  return (
    <label htmlFor="seller-select">
      <select
        className="seller-select"
        id="seller-select"
        data-testid="customer_checkout__select-seller"
        onChange={ submitSellerId }
      >
        <option>
          Selecione um vendedor
        </option>
        { main }
      </select>
    </label>
  );
}

export default SellerSelect;
