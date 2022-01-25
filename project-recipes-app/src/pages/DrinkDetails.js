import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DetailedCard from '../components/DetailedCard';
import { searchByDrinkId } from '../services/searchApi';

function DrinkDetails(props) {
  const { history, match: { params: { drinkId } } } = props;
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getDataFromAPI = async () => {
      const fetchProduct = await searchByDrinkId(drinkId);
      setProduct(fetchProduct.drinks[0]);
    };
    getDataFromAPI();
  }, [drinkId]);

  return (
    <div>
      { product
        && <DetailedCard
          product={ product }
          history={ history }
          type="drink"
        /> }
    </div>
  );
}

DrinkDetails.propTypes = {
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      drinkId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinkDetails;
