import React from 'react';
import { string, number } from 'prop-types';

function TitleText(props) {
  const { name, id } = props;

  return (
    <h1
      className="card-title"
      data-testid={ `customer_products__element-card-title-${id}` }
    >
      { name }
    </h1>
  );
}

TitleText.propTypes = {
  name: string.isRequired,
  id: number.isRequired,
};

export default TitleText;
