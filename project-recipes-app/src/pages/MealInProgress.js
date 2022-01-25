import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { searchByMealId } from '../services/searchApi';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import IngredientSteps from '../components/IngredientSteps';

function InProgress(props) {
  const { history, match: { params: { id } } } = props;
  const [detailedProd, setDetailedProd] = useState({});
  const [prod, setProd] = useState({});
  const detailsLink = `/comidas/${id}`;
  const { location: { pathname } } = history;
  const DOZE_CHAR = 12;
  useEffect(() => {
    const getDataFromAPI = async () => {
      const fetchProduct = await searchByMealId(id);
      const prodObj = {
        id: fetchProduct.meals[0].idMeal,
        type: 'comida',
        area: fetchProduct.meals[0].strArea,
        category: fetchProduct.meals[0].strCategory,
        alcoholicOrNot: '',
        name: fetchProduct.meals[0].strMeal,
        image: fetchProduct.meals[0].strMealThumb,
      };
      setDetailedProd(fetchProduct.meals[0]);
      setProd(prodObj);
    };
    getDataFromAPI();
  }, [id]);

  return (
    <div className="details-body">
      <header>
        <button
          className="return-button"
          type="button"
          onClick={ () => (
            history.push(pathname.substr(0, pathname.length - DOZE_CHAR))
          ) }
        >
          Voltar
        </button>
      </header>
      <div className="image-container">
        <div className="recipe-spects">
          <h2 data-testid="recipe-title">
            { prod.name }
          </h2>
          <p data-testid="recipe-category">
            { prod.category }
          </p>
          <img
            data-testid="recipe-photo"
            variant="top"
            alt="foto da receita"
            style={ { width: '100%', height: 300, objectFit: 'cover' } }
            src={ prod.image }
          />
          <div className="detail-buttons">
            <FavoriteBtn product={ prod } />
            <ShareBtn link={ detailsLink } />
          </div>
        </div>
      </div>
      <IngredientSteps
        history={ history }
        product={ detailedProd }
        type="meals"
        id={ id }
      />
    </div>
  );
}

InProgress.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default InProgress;
