import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente App', () => {
  test('Os links estão sendo renderizados', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByText(/Home/i);
    const aboutLink = screen.getByText(/About/i);
    const favoritesLink = screen.getByText(/Favorite Pokémons/i);

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });

  test('O link Home está levando para a URL correta', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByText(/Home/i);
    userEvent.click(homeLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('O link About está levando para a URL correta', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByText(/About/i);
    userEvent.click(aboutLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('O link Favorite Pokémons está levando para a URL correta', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByText(/Favorite Pokémons/i);
    userEvent.click(favoritesLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  test('Digitando uma URL que não existe leve ao componente 404', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-nao-existente');
    const notFoundText = screen.getByRole('heading', {
      name: /Page requested not found/i, level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
