import React, { useContext } from 'react';
import { bool } from 'prop-types';
import TableItem from './TableItem';
import AppContext from '../../../context/AppContext';

function OrderTable(props) {
  const { hasRemove } = props;
  const { cart } = useContext(AppContext);

  const tableItems = (
    cart.map((item, index) => {
      const { id, name, price, quantity } = item;
      const subTotal = (Number(price) * Number(quantity)).toFixed(2);
      return (
        <TableItem
          key={ `key-table-item-${name}-${id}` }
          index={ index }
          id={ id }
          name={ name }
          quantity={ quantity }
          unitPrice={ price }
          subTotal={ subTotal }
          hasRemove={ hasRemove }
        />
      );
    })
  );

  return (
    <table className="order-table">
      <thead>
        <tr className="trOrder">
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>Remover Item</th>
        </tr>
      </thead>
      <tbody>
        { tableItems }
      </tbody>
    </table>
  );
}

OrderTable.propTypes = {
  hasRemove: bool.isRequired,
};

export default OrderTable;
