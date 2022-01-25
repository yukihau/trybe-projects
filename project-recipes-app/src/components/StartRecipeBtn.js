import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/AppContext';

function StartRecipeBtn({ type, id, history }) {
  const {
    startedRecipes,
    setStartedRecipes,
    finishedRecipes,
  } = useContext(Context);
  const typeForManipulation = type === 'meal' ? 'meals' : 'cocktails';
  const url = type === 'meal' ? '/comidas' : '/bebidas';

  const isRecipeStarted = startedRecipes[typeForManipulation]
  && startedRecipes[typeForManipulation][id];
  const isRecipeFinished = finishedRecipes.find((recipe) => recipe.id === id);

  function handleRecipeButton() {
    history.push(`${url}/${id}/in-progress`);
    if (!isRecipeStarted) {
      const objLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
      let finalObj = { [typeForManipulation]: { [id]: [] } };
      if (objLS) finalObj = { ...finalObj, ...objLS };
      localStorage.setItem('inProgressRecipes', JSON.stringify(finalObj));
      setStartedRecipes(finalObj);
    }
  }

  return !isRecipeFinished && (
    <div className="make-recipe-btn-container">
      <button
        type="button"
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
        onClick={ handleRecipeButton }
      >
        { isRecipeStarted ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>
    </div>
  );
}

StartRecipeBtn.defaultProps = {
  id: '',
};

StartRecipeBtn.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default StartRecipeBtn;
