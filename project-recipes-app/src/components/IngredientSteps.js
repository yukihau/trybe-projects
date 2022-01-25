import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import FinishRecipeBtn from './FinishRecipeBtn';

function Details({ product, type, id, history }) {
  const prod = product;
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [state, setState] = useState([]);

  useEffect(() => {
    setIngredients(Object.keys(prod)
      .filter((key) => key
        .includes('Ingredient') && prod[key] !== null && prod[key] !== '')
      .map((key) => prod[key]));
    setMeasures(Object.keys(prod)
      .filter((key) => key.includes('Measure') && prod[key] !== null && prod[key] !== '')
      .map((key) => prod[key]));
  }, [prod]);

  useEffect(() => {
    const INITIAL_STATE = ingredients.map((ingredient) => ({
      name: ingredient,
      isChecked: false,
    }));

    function checkLocalStorage() {
      const objForLocalStorage = { [type]: { [id]: [] } };
      const fetchFromLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (!fetchFromLocalStorage) {
        localStorage.setItem('inProgressRecipes', JSON.stringify(objForLocalStorage));
      } else if (!fetchFromLocalStorage[type]) {
        const newLocalStorage = { ...fetchFromLocalStorage, [type]: { [id]: [] } };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorage));
      } else if (!fetchFromLocalStorage[type][id]) {
        const newLocalStorage = {
          ...fetchFromLocalStorage,
          [type]: { ...fetchFromLocalStorage[type], [id]: [] },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorage));
      }
      const localStorageItem = JSON.parse(
        localStorage.getItem('inProgressRecipes'),
      )[type][id];
      const newState = INITIAL_STATE.map((ingredient) => {
        if (localStorageItem.includes(ingredient.name)) {
          return { ...ingredient, isChecked: true };
        }
        return ingredient;
      });
      setState(newState);
    }

    checkLocalStorage();
  }, [ingredients]);

  function handleCheck({ target }, index) {
    const { checked, name } = target;
    if (checked === true) {
      const getFromLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      getFromLocalStorage[type][id].push(name);
      localStorage.setItem('inProgressRecipes', JSON.stringify(getFromLocalStorage));
      state[index].isChecked = true;
      setState([...state]);
    } else {
      const getFromLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const progressArr = getFromLocalStorage[type][id];
      getFromLocalStorage[type][id] = progressArr
        .filter((checkbox) => checkbox !== name);
      localStorage.setItem('inProgressRecipes', JSON.stringify(getFromLocalStorage));
      state[index].isChecked = false;
      setState([...state]);
    }
  }

  return (
    <div className="recipe-details">
      <div>
        <Card.Title>Ingredients</Card.Title>
        <div className="ingredient-steps">
          { state.map((ingredient, index) => (
            <div
              key={ `${ingredient.name}-${index}` }
              data-testid={ `${index}-ingredient-step` }
            >
              <label htmlFor={ `${index}-checkbox` }>
                <input
                  id={ `${index}-checkbox` }
                  name={ ingredient.name }
                  type="checkbox"
                  onChange={ (event) => handleCheck(event, index) }
                  checked={ ingredient.isChecked }
                />
                { ' ' }
                { measures[index]
                  ? `${measures[index]} of ${ingredient.name}`
                  : ingredient.name }
              </label>
            </div>
          )) }
        </div>
      </div>
      <Card.Title>Instructions</Card.Title>
      <Card.Text data-testid="instructions">
        { prod.strInstructions }
      </Card.Text>
      <FinishRecipeBtn
        type={ type }
        product={ prod }
        history={ history }
        checkboxes={ state }
      />
    </div>
  );
}

Details.propTypes = {
  product: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default Details;
