import React from 'react';
import PropTypes from 'prop-types';
import Recommendations from './Recommendations';
import StartRecipeBtn from './StartRecipeBtn';
import FavoriteBtn from './FavoriteBtn';
import Details from './Details';
import ShareBtn from './ShareBtn';
import '../assets/css/details.css';

function CardDetails(props) {
  const { product, type, history } = props;
  const detailedProd = product;
  let embed;
  const prod = {
    id: detailedProd.idMeal || detailedProd.idDrink,
    type: type === 'meal' ? 'comida' : 'bebida',
    area: detailedProd.strArea || '',
    category: detailedProd.strCategory || '',
    alcoholicOrNot: detailedProd.strAlcoholic || '',
    name: detailedProd.strMeal || detailedProd.strDrink,
    image: detailedProd.strMealThumb || detailedProd.strDrinkThumb,
  };
  if (detailedProd.strYoutube) {
    // Referência: https://stackoverflow.com/questions/573145/get-everything-after-the-dash-in-a-string-in-javascript
    embed = `https://www.youtube.com/embed/${detailedProd.strYoutube.split('watch?v=')[1]}`;
  }
  const detailsLink = `/${type === 'meal' ? 'comidas' : 'bebidas'}/${prod.id}`;
  const returnButton = `/${type === 'meal' ? 'comidas' : 'bebidas'}`;
  return (
    <div className="details-body">
      <header>
        <button
          className="return-button"
          type="button"
          onClick={ () => (
            history.push(returnButton)
          ) }
        >
          Voltar
        </button>
      </header>
      <div className="image-container">
        <div data-testid="recipe-card" className="recipe-spects">
          <h2 data-testid="recipe-title">
            { prod.name }
          </h2>
          <p data-testid="recipe-category">
            { type === 'meal' ? prod.category : prod.alcoholicOrNot }
          </p>
          <img
            data-testid="recipe-photo"
            alt={ `imagem da receita ${prod.name}` }
            variant="top"
            style={ { width: 'auto', height: 300, objectFit: 'cover' } }
            src={ prod.image }
          />
          <div className="detail-buttons">
            <FavoriteBtn product={ prod } />
            <ShareBtn link={ detailsLink } />
          </div>
        </div>
      </div>
      <Details product={ detailedProd } />
      <div className="recipe-details">
        { type === 'meal'
          && <iframe
            title={ prod.strTitle }
            src={ embed }
            allowFullScreen
            data-testid="video"
          /> }
      </div>
      <div className="recipe-details">
        <h3>Recomendadas</h3>
        <Recommendations type={ type } />
      </div>
      <StartRecipeBtn history={ history } type={ type } id={ prod.id } />
    </div>
  );
}

CardDetails.propTypes = {
  product: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CardDetails;
