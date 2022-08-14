import React from 'react';
import { Link } from 'react-router-dom';
import { number, string } from 'prop-types';
import IdText from './IdText';
import StatusText from './StatusText';
import DateText from './DateText';
import PriceText from './PriceText';

function OrderCard(props) {
  const { id, status, date, price } = props;

  return (
    <Link to={ `/customer/orders/${id}` } className="link">
      <div className="order-card">
        <IdText id={ id } />
        <StatusText id={ id } status={ status } />
        <div className="card-right">
          <DateText id={ id } date={ date } />
          <PriceText id={ id } price={ price } />
        </div>
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  id: number.isRequired,
  status: string.isRequired,
  date: string.isRequired,
  price: string.isRequired,
};

export default OrderCard;
