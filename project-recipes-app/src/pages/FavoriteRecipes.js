import React, { useContext } from 'react';
import Header from '../components/Header';
import CardReceita from '../components/CardReceita';
import AppContext from '../context/AppContext';

function FavoriteRecipes() {
  const { favoriteRecipes, hasFilter, favFilter } = useContext(AppContext);

  function handleFilters() {
    if (hasFilter) {
      const filtered = favoriteRecipes.filter((recipe) => recipe.type === favFilter);
      return filtered;
    }
    return favoriteRecipes;
  }
  return (
    <>
      <Header pageTitle="Receitas Favoritas" />
      <section className="card-favContainer">
        { handleFilters().map((recipe, index) => (
          <CardReceita
            pageTitle="Receitas Favoritas"
            key={ index }
            recipe={ recipe }
            index={ index }
          />
        )) }
      </section>
    </>
  );
}

export default FavoriteRecipes;
