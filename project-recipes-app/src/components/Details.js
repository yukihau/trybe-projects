import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function Details({ product }) {
  const prod = product;
  const ingredients = Object.keys(prod)
    .filter((key) => key.includes('Ingredient') && prod[key] !== null && prod[key] !== '')
    .map((key) => prod[key]);
  const measures = Object.keys(prod)
    .filter((key) => key.includes('Measure') && prod[key] !== null && prod[key] !== '')
    .map((key) => prod[key]);

  return (
    <div className="recipe-details">
      <Card.Title>Ingredients</Card.Title>
      <ul>
        { ingredients.map((ingredient, index) => (
          <li
            key={ `${ingredient}-${index}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { measures[index]
              ? `${measures[index]} of ${ingredient}`
              : ingredient }
          </li>
        )) }
      </ul>
      <div>
        <Card.Title>Instructions</Card.Title>
        <Card.Text data-testid="instructions">
          { prod.strInstructions }
        </Card.Text>
      </div>
    </div>
  );
}

Details.propTypes = {
  product: PropTypes.shape({}).isRequired,
};

export default Details;
