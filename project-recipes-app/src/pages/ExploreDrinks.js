import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import fetchAPI from '../fetchApi';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks() {
  const history = useHistory();

  async function getRecipeRadom() {
    const URL_BEBIDA = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const bebida = await fetchAPI(URL_BEBIDA);
    history.push(`/bebidas/${bebida.drinks[0].idDrink}`);
  }

  return (
    <section>
      <Header pageTitle="Explorar Bebidas" />
      <nav className="category-container">
        <div>
          <Link to="/explorar/bebidas/ingredientes">
            <button data-testid="explore-by-ingredient" type="button">
              Por Ingredientes
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

export default ExploreDrinks;
