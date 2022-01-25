import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../assets/css/perfilStyles.css';

function Perfil() {
  const localUserData = localStorage.getItem('user');
  let email = '';
  if (localUserData) {
    const auxiliarEmail = JSON.parse(localUserData);
    email = auxiliarEmail.email;
  }

  const history = useHistory();

  function recipesDone() {
    history.push('/receitas-feitas');
  }

  function recipesFavorites() {
    history.push('/receitas-favoritas');
  }

  return (
    <main className="main-section">
      <Header pageTitle="Perfil" />
      <div className="email-field">
        <h2 data-testid="profile-email">
          {email}
        </h2>
      </div>
      <nav className="category-container">
        <div>
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ recipesDone }
          >
            Receitas Feitas
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ recipesFavorites }
          >
            Receitas Favoritas
          </button>
        </div>
      </nav>
      <Footer />
    </main>
  );
}

export default Perfil;
