import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import fetchAPI from '../fetchApi';

function AppProvider({ children }) {
  const INITIAL_STATE = {
    meals: [],
    drinks: [],
  };

  const [data, setData] = useState(INITIAL_STATE);

  const [recipeIngredients, setRecipeIngredients] = useState(INITIAL_STATE);

  const [comida, setComida] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const [startedRecipes, setStartedRecipes] = useState({ meals: {}, cocktails: {} });
  const [finishedRecipes, setFinishedRecipes] = useState([]);

  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favFilter, setFavFilter] = useState('');
  const [hasFilter, setHasFilter] = useState(false);

  const [placesOfOrigin, setPlacesOfOrigin] = useState({ placesOfOrigin: [] });
  const [places, setPlaces] = useState({ meals: [] });

  const getDataFromAPI = async () => {
    const mealsList = await fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const drinksList = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    setData({
      meals: mealsList.meals,
      drinks: drinksList.drinks,
    });
  };

  const searchForPlacesOfOrigin = async () => {
    const response = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    setPlacesOfOrigin({
      placesOfOrigin: response.meals.map((element) => element.strArea),
    });
  };

  const searchForFoodByArea = async (place) => {
    const response = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${place}`);
    setPlaces({ meals: response.meals });
  };

  useEffect(() => {
    const getFromLocalStorage = () => {
      const favoritesLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoritesLS) setFavoriteRecipes(favoritesLS);
      const startedLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (startedLS) setStartedRecipes(startedLS);
      const finishedLS = JSON.parse(localStorage.getItem('doneRecipes'));
      if (finishedLS) setFinishedRecipes(finishedLS);
    };
    getDataFromAPI();
    getFromLocalStorage();
    searchForPlacesOfOrigin();
  }, []);

  return (
    <AppContext.Provider
      value={ { data,
        setData,
        recipeIngredients,
        setRecipeIngredients,
        comida,
        setComida,
        drinks,
        setDrinks,
        getDataFromAPI,
        startedRecipes,
        setStartedRecipes,
        finishedRecipes,
        setFinishedRecipes,
        favoriteRecipes,
        setFavoriteRecipes,
        hasFilter,
        setHasFilter,
        favFilter,
        setFavFilter,
        places,
        searchForPlacesOfOrigin,
        placesOfOrigin,
        searchForFoodByArea,
      } }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
