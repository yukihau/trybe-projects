import React, { useContext } from 'react';
import Header from '../components/Header';
import CardReceita from '../components/CardReceita';
import AppContext from '../context/AppContext';

function MadeRecipes() {
  const { hasFilter, favFilter } = useContext(AppContext);

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  function recipes() {
    if (!doneRecipes) return [];
    if (hasFilter) {
      const filtered = doneRecipes.filter((recipe) => recipe.type === favFilter);
      return filtered;
    }
    return doneRecipes;
  }
  return (
    <div>
      <Header pageTitle="Receitas Feitas" />
      <section className="card-favContainer">
        { recipes().map((recipe, index) => (
          <CardReceita
            pageTitle="Receitas Feitas"
            key={ index }
            index={ index }
            recipe={ recipe }
          />
        )) }
      </section>
    </div>
  );
}

export default MadeRecipes;
