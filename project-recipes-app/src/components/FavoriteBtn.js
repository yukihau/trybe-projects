import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/AppContext';
import BlackHeart from '../images/blackHeartIcon.svg';
import WhiteHeart from '../images/whiteHeartIcon.svg';

function setTestId(title, i) {
  if (title === 'Receitas Favoritas') {
    return `${i}-horizontal-favorite-btn`;
  }
  return 'favorite-btn';
}

function FavoriteBtn({ product, pageTitle, index }) {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(Context);
  const prod = product;
  const isFavorited = favoriteRecipes.find((recipe) => recipe.id === prod.id);

  function handleFavorite() {
    const preLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (isFavorited) {
      const finalArr = preLocal.filter((recipe) => recipe.id !== prod.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(finalArr));
      setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe.id !== prod.id));
    } else {
      const finalArr = preLocal ? [...preLocal, prod] : [prod];
      localStorage.setItem('favoriteRecipes', JSON.stringify(finalArr));
      setFavoriteRecipes([...favoriteRecipes, prod]);
    }
  }

  return (
    <input
      data-testid={ setTestId(pageTitle, index) }
      type="image"
      alt="Botão de favoritar"
      src={ isFavorited ? BlackHeart : WhiteHeart }
      onClick={ handleFavorite }
    />
  );
}

FavoriteBtn.defaultProps = {
  index: '',
  pageTitle: '',
};

FavoriteBtn.propTypes = {
  product: PropTypes.shape({}).isRequired,
  index: PropTypes.string,
  pageTitle: PropTypes.string,
};

export default FavoriteBtn;
