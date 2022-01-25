import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DetailedCard from '../components/DetailedCard';
import { searchByMealId } from '../services/searchApi';

function MealDetails(props) {
  const { history, match: { params: { mealId } } } = props;
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getDataFromAPI = async () => {
      const fetchProduct = await searchByMealId(mealId);
      setProduct(fetchProduct.meals[0]);
    };
    getDataFromAPI();
  }, [mealId]);

  return (
    <div>
      { product
        && <DetailedCard
          product={ product }
          history={ history }
          type="meal"
        /> }
    </div>
  );
}

MealDetails.propTypes = {
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      mealId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MealDetails;
