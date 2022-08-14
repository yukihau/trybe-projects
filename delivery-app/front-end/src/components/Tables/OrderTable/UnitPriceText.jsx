import React from 'react';
import { number, string } from 'prop-types';

function UnitPriceText(props) {
  const { index, unitPrice, testIdPrefix } = props;
  const priceString = Number(unitPrice).toFixed(2).toString().replace('.', ',');
  return (
    <td>
      <h1
        className="table-unit-price"
        data-testid={ `${testIdPrefix}element-order-table-unit-price-${index}` }
      >
        { priceString }
      </h1>
    </td>
  );
}

UnitPriceText.propTypes = {
  index: number.isRequired,
  unitPrice: string.isRequired,
  testIdPrefix: string.isRequired,
};

export default UnitPriceText;
