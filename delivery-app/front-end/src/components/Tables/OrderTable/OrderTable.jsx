import React from 'react';
import { string, number, arrayOf, shape } from 'prop-types';
import TableItem from './TableItem';

function OrderTable(props) {
  const { testIdPrefix, products } = props;

  const tableItems = (
    products.map((item, index) => {
      const { id, name, price, SaleProduct: { quantity } } = item;
      const subTotal = (Number(price) * Number(quantity)).toFixed(2);
      return (
        <TableItem
          key={ id }
          index={ index }
          name={ name }
          quantity={ quantity }
          unitPrice={ price }
          subTotal={ subTotal }
          testIdPrefix={ testIdPrefix }
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
        </tr>
      </thead>
      <tbody>
        { tableItems }
      </tbody>
    </table>
  );
}

OrderTable.propTypes = {
  testIdPrefix: string.isRequired,
  products: arrayOf(shape({
    name: string,
    quantity: number,
    price: string,
  })),
};

OrderTable.defaultProps = {
  products: [],
};

export default OrderTable;
