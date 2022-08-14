import React from 'react';
import { number, string } from 'prop-types';
import helper from '../../../helpers/helper';

function DateText(props) {
  const { id, date } = props;
  const dateString = helper.getFormattedDate(date);

  return (
    <div className="date-text">
      <span
        data-testid={ `customer_orders__element-order-date-${id}` }
      >
        { dateString }
      </span>
    </div>
  );
}

DateText.propTypes = {
  id: number.isRequired,
  date: string.isRequired,
};

export default DateText;
