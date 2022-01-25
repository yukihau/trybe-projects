import PropTypes from 'prop-types';
import React from 'react';
import '../assets/css/recipeCard.css';

function CardIngredients(props) {
  const { name, img, index } = props;

  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img
        alt="teste"
        data-testid={ `${index}-card-img` }
        src={ img }
      />
      <div>
        <h3 data-testid={ `${index}-card-name` }>
          { name }
        </h3>
      </div>
    </div>

  );
}

CardIngredients.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default CardIngredients;
