import React, { useContext, useState } from 'react';
import Context from '../context/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CardReceita from '../components/CardReceita';
import '../assets/css/exploreLocal.css';

function ExploreLocalFood() {
  const MAX_MEALS = 12;
  const [filterByLocation, setFilterByLocation] = useState('all');
  const {
    data: { meals },
    placesOfOrigin: { placesOfOrigin },
    places,
    searchForFoodByArea,
  } = useContext(Context);

  function handleChange({ target: { value } }) {
    searchForFoodByArea(value);
    setFilterByLocation(value);
  }

  function assembleCards(data) {
    return (
      data.map(
        ({ strMeal, strMealThumb, idMeal }, index) => index < MAX_MEALS && (
          <CardReceita
            key={ index }
            name={ strMeal }
            img={ strMealThumb }
            index={ index }
            id={ idMeal }
          />
        ),
      )
    );
  }

  function showReceitas() {
    return (
      <div>
        <Header pageTitle="Explorar Origem" />
        <section className="section-select">
          <select
            onChange={ (event) => handleChange(event) }
            data-testid="explore-by-area-dropdown"
          >
            <option value="all" data-testid="All-option">
              All
            </option>
            {placesOfOrigin.map((element) => (
              <option
                value={ element }
                key={ element }
                data-testid={ `${element}-option` }
              >
                {element}
              </option>
            ))}
          </select>
        </section>

        <section className="card-container">
          <div>
            {filterByLocation === 'all' ? (
              assembleCards(meals)
            ) : (
              assembleCards(places.meals)
            )}
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return <section>{showReceitas()}</section>;
}

export default ExploreLocalFood;
