import React from 'react';
import { Link } from 'react-router-dom';
import { number, string } from 'prop-types';
import IdText from './IdText';
import StatusText from './StatusText';
import DateText from './DateText';
import PriceText from './PriceText';
import AddressText from './AddressText';

function SellerOrderCard(props) {
  const { id, status, date, price, deliveryAddress, deliveryNumber } = props;

  return (
    <Link to={ `/seller/orders/${id}` } className="link">
      <div className="seller-order-card">
        <div className="order-card">
          <IdText id={ id } />
          <StatusText id={ id } status={ status } />
          <div className="card-right">
            <DateText id={ id } date={ date } />
            <PriceText id={ id } price={ price } />
          </div>
        </div>
        <div className="order-card-address">
          <AddressText
            id={ id }
            deliveryAddress={ deliveryAddress }
            deliveryNumber={ deliveryNumber }
          />
        </div>
      </div>
    </Link>
  );
}

SellerOrderCard.propTypes = {
  id: number.isRequired,
  status: string.isRequired,
  date: string.isRequired,
  price: string.isRequired,
  deliveryAddress: string.isRequired,
  deliveryNumber: string.isRequired,
};

export default SellerOrderCard;
