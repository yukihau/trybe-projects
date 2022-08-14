// General
import React from 'react';
import { number, string } from 'prop-types';

// Table Components
import IndexText from './IndexText';
import NameText from './NameText';
import QuantityText from './QuantityText';
import UnitPriceText from './UnitPriceText';
import SubTotalText from './SubTotalText';

function TableItem(props) {
  const { index, name, quantity, unitPrice, subTotal, testIdPrefix } = props;

  return (
    <tr className="trTable">
      <IndexText
        index={ index }
        testIdPrefix={ testIdPrefix }
      />
      <NameText
        index={ index }
        name={ name }
        testIdPrefix={ testIdPrefix }
      />
      <QuantityText
        index={ index }
        quantity={ quantity }
        testIdPrefix={ testIdPrefix }
      />
      <UnitPriceText
        index={ index }
        unitPrice={ unitPrice }
        testIdPrefix={ testIdPrefix }
      />
      <SubTotalText
        index={ index }
        subTotal={ subTotal }
        testIdPrefix={ testIdPrefix }
      />
    </tr>
  );
}

TableItem.propTypes = {
  index: number.isRequired,
  name: string.isRequired,
  quantity: number.isRequired,
  unitPrice: string.isRequired,
  subTotal: string.isRequired,
  testIdPrefix: string.isRequired,
};

export default TableItem;
