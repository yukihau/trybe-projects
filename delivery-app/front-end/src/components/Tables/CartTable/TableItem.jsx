// General
import React, { useContext } from 'react';
import { number, string } from 'prop-types';
import storage from '../../../helpers/storage';
import AppContext from '../../../context/AppContext';

// Table Components
import IndexText from './IndexText';
import NameText from './NameText';
import QuantityText from './QuantityText';
import UnitPriceText from './UnitPriceText';
import SubTotalText from './SubTotalText';
import RemoveButton from './RemoveButton';
import '../../../css/cartTable.css';

function TableItem(props) {
  const { index, id, name, quantity, unitPrice, subTotal } = props;
  const { getCart } = useContext(AppContext);

  const removeItemFromTable = () => {
    storage.cart.product.remove(id);
    getCart();
  };

  return (
    <tr className="trTable">
      <IndexText
        index={ index }
      />
      <NameText
        index={ index }
        name={ name }
      />
      <QuantityText
        index={ index }
        quantity={ quantity }
      />
      <UnitPriceText
        index={ index }
        unitPrice={ unitPrice }
      />
      <SubTotalText
        index={ index }
        subTotal={ subTotal }
      />
      <RemoveButton
        index={ index }
        onClick={ removeItemFromTable }
      />
    </tr>
  );
}

TableItem.propTypes = {
  index: number.isRequired,
  id: number.isRequired,
  name: string.isRequired,
  quantity: number.isRequired,
  unitPrice: string.isRequired,
  subTotal: string.isRequired,
};

export default TableItem;
