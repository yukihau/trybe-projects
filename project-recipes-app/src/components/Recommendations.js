import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Carousel } from 'react-bootstrap';
import Context from '../context/AppContext';

function groupIntoTwo(arr) {
  const result = [];
  let current = [];
  const MAX_LEN = 5;
  arr.forEach((item, index) => {
    current.push(item);
    if (current.length === 2 || index === MAX_LEN) {
      result.push(current);
      current = [];
    }
  });
  return result;
}

function CardRecommendations(props) {
  const { type } = props;
  const { data: { meals, drinks } } = useContext(Context);
  const MAX = 6;
  const recommendations = type === 'meal'
    ? groupIntoTwo(drinks.slice(0, MAX))
    : groupIntoTwo(meals.slice(0, MAX));
  const id = type === 'meal' ? 'idDrink' : 'idMeal';
  const title = type === 'meal' ? 'strDrink' : 'strMeal';
  const subtitle = type === 'meal' ? 'strAlcoholic' : 'strCategory';
  const linkName = type === 'meal' ? '/bebidas/' : '/comidas/';
  const img = type === 'meal' ? 'strDrinkThumb' : 'strMealThumb';
  let index = 0 - 1;

  function renderCard(product) {
    index += 1;
    return (
      <Link
        to={ `${linkName}${product[id]}` }
      >
        <Card
          style={ { width: '50%', height: 300, display: 'inline-block' } }
          data-testid={ `${index}-recomendation-card` }
        >
          <Card.Img
            data-testid="recipe-photo"
            variant="top"
            style={ {
              width: '100%', height: '70%', marginBottom: 15, objectFit: 'cover',
            } }
            src={ product[img] }
          />
          <Card.Subtitle
            style={ { color: 'gray' } }
          >
            { product[subtitle] }
          </Card.Subtitle>
          <Card.Title
            data-testid={ `${index}-recomendation-title` }
          >
            { product[title] }
          </Card.Title>
        </Card>
      </Link>
    );
  }

  return (
    <div className="recommendations">
      <Carousel>
        { recommendations && recommendations.map((product) => (
          <Carousel.Item key={ `${product[0][id]}-${product[1] && product[1][id]}` }>
            { renderCard(product[0]) }
            { product[1] && renderCard(product[1]) }
          </Carousel.Item>
        )) }
      </Carousel>
    </div>
  );
}

CardRecommendations.propTypes = {
  type: PropTypes.string.isRequired,
};

export default CardRecommendations;
