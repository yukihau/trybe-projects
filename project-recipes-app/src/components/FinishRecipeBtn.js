import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  isDisabled: true,
};

function FinishRecipeBtn({ checkboxes, product, type }) {
  const [state, setState] = useState(INITIAL_STATE);
  const historyHook = useHistory();

  function setTags(tags) {
    if (!tags) return [];
    return tags.split(', ');
  }

  useEffect(() => {
    const checkCheckboxes = checkboxes
      .filter((checkbox) => checkbox.isChecked === true);
    if (checkCheckboxes.length === checkboxes.length) {
      setState({ isDisabled: false });
    } else {
      setState({ isDisabled: true });
    }
  }, [checkboxes]);

  function handleFinishButton(history, prod, tipo) {
    history.push('/receitas-feitas');
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = `${dia}/${mes}/${ano}`;
    let localStorageItems = JSON.parse(localStorage.getItem('doneRecipes'));
    const prodObj = {
      id: prod.idMeal || prod.idDrink,
      type: tipo === 'meals' ? 'comida' : 'bebida',
      area: prod.strArea || '',
      category: prod.strCategory || '',
      alcoholicOrNot: prod.strAlcoholic || '',
      name: prod.strMeal || prod.strDrink,
      image: prod.strMealThumb || prod.strDrinkThumb,
      doneDate: dataAtual,
      tags: setTags(prod.strTags),
    };
    if (!localStorageItems) {
      localStorageItems = [];
    }
    localStorage.setItem('doneRecipes', JSON.stringify([...localStorageItems, prodObj]));
  }

  return (
    <div className="make-recipe-btn-container">
      <button
        type="button"
        className="finish-recipe-btn"
        data-testid="finish-recipe-btn"
        onClick={ () => handleFinishButton(historyHook, product, type) }
        disabled={ state.isDisabled }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

FinishRecipeBtn.propTypes = {
  checkboxes: PropTypes.shape([]).isRequired,
  type: PropTypes.string.isRequired,
  product: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default FinishRecipeBtn;
