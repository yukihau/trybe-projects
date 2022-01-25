import React from 'react';
import { useHistory } from 'react-router';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../assets/css/footer.css';

function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
      className="footer-section"
    >
      <input
        // className="search-input"
        type="image"
        alt="drink-button"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        onClick={ () => history.push('/bebidas') }
      />
      <input
        // className="search-input"
        type="image"
        alt="explore-button"
        data-testid="explore-bottom-btn"
        src={ exploreIcon }
        onClick={ () => history.push('/explorar') }
      />
      <input
        // className="search-input"
        type="image"
        alt="food-button"
        data-testid="food-bottom-btn"
        src={ mealIcon }
        onClick={ () => history.push('/comidas') }
      />
    </footer>
  );
}

export default Footer;
