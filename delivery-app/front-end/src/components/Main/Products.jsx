import React, { useContext } from 'react';
import LoadingText from '../Text/LoadingText';
import { ProductCard } from '../Cards';
import AppContext from '../../context/AppContext';

function Products() {
  const { products, appState } = useContext(AppContext);

  const main = (
    products.map((product) => {
      const { id, name, price, urlImage } = product;
      return (
        <ProductCard
          key={ id }
          id={ id }
          name={ name }
          price={ price }
          urlImage={ urlImage }
        />
      );
    })
  );

  return (
    <main className="main-products">
      {
        appState.apiIsLoading
          ? <LoadingText text={ appState.apiStatus } />
          : main
      }
    </main>
  );
}

export default Products;
