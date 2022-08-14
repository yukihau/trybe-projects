import React from 'react';
import { string, number } from 'prop-types';

function Image(props) {
  const { urlImage, id } = props;

  return (
    <img
      className="card-image"
      src={ urlImage }
      alt={ `Imagem do produto ${id}` }
      data-testid={ `customer_products__img-card-bg-image-${id}` }
    />
  );
}

Image.propTypes = {
  urlImage: string.isRequired,
  id: number.isRequired,
};

export default Image;
