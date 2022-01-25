import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import fetchAPI from '../fetchApi';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFood() {
  const history = useHistory();

  async function getRecipeRadom() {
    const URL_COMIDA = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const comida = await fetchAPI(URL_COMIDA);
    history.push(`/comidas/${comida.meals[0].idMeal}`);
  }

  return (
    <section>
      <Header pageTitle="Explorar Comidas" />
      <nav className="category-container">
        <div>
          <Link to="/explorar/comidas/ingredientes">
            <button data-testid="explore-by-ingredient" type="button">
              Por Ingredientes
            </button>
          </Link>

          <Link to="/explorar/comidas/area">
            <button data-testid="explore-by-area" type="button">
              Por Local de Origem
            </button>
          </Link>

          <button data-testid="explore-surprise" type="button" onClick={ getRecipeRadom }>
            Me Surpreenda!
          </button>
        </div>
      </nav>
      <Footer />
    </section>
  );
}

export default ExploreFood;
