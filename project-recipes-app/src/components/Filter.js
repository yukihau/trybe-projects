import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import fetchAPI from '../fetchApi';
import Context from '../context/AppContext';

const INITIAL_STATE = [{ strCategory: 'All' }];

function Filter({ url }) {
  const [firstTime, setFirstTime] = useState(true);
  const history = useHistory();
  const { location: { pathname } } = history;
  const { setData, data, getDataFromAPI } = useContext(Context);

  const [category, setCategory] = useState(INITIAL_STATE);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filterByCategory = async (categoryToBeFilter) => {
    if (categoryToBeFilter === 'All') {
      if (pathname === '/comidas') {
        const mealsList = await fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setData({ ...data, meals: mealsList.meals });
      } else if (pathname === '/bebidas') {
        const drinksList = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        setData({ ...data, drinks: drinksList.drinks });
      }
      return null;
    }

    if (pathname === '/comidas') {
      const mealsByCategory = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryToBeFilter}`);
      setData({ ...data, meals: mealsByCategory.meals });
    } else if (pathname === '/bebidas') {
      const drinksByCategory = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryToBeFilter}`);
      setData({ ...data, drinks: drinksByCategory.drinks });
    }
  };

  const checkToggle = (categoryToBeFilter) => {
    if (selectedCategory === categoryToBeFilter) {
      getDataFromAPI();
      setSelectedCategory('All');
      return null;
    }
    setSelectedCategory(categoryToBeFilter);
    filterByCategory(categoryToBeFilter);
  };

  useEffect(() => {
    const getCategory = async () => {
      const categoryFilter = await fetchAPI(url);
      const MAX_CATEGORY = 5;
      const page = url.split('www.')[1].split('.com')[0];
      if (page === 'themealdb') {
        setCategory([...category, ...categoryFilter.meals
          .filter((_, index) => index < MAX_CATEGORY)]);
        return null;
      }
      setCategory([...category, ...categoryFilter.drinks
        .filter((_, index) => index < MAX_CATEGORY)]);
    };
    if (firstTime) {
      getCategory();
      setFirstTime(false);
    }
  }, [category, url, firstTime]);

  return (
    <nav className="category-container">
      <div>
        { category && category
          .map((cat, index) => (
            <button
              className="category-button"
              key={ index }
              type="button"
              data-testid={ `${cat.strCategory}-category-filter` }
              onClick={ () => checkToggle(cat.strCategory) }
            >
              { cat.strCategory }
            </button>
          )) }
      </div>
    </nav>
  );
}

Filter.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Filter;
