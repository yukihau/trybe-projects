import React from 'react';
import { string } from 'prop-types';
import helper from '../../helpers/helper';

function OrderDate(props) {
  const { date, testIdPrefix } = props;

  const formattedDate = helper.getFormattedDate(date);
  const testId = `${testIdPrefix}element-order-details-label-order-date`;

  return (
    <div className="details-date">
      <span data-testid={ testId }>
        { formattedDate }
      </span>
    </div>
  );
}

OrderDate.propTypes = {
  date: string.isRequired,
  testIdPrefix: string.isRequired,
};

export default OrderDate;
