import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Pokemon', () => {
  test('O card é renderizado com as informações esperadas', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByAltText(/Pikachu sprite/i);
    const URL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(name).toHaveTextContent(/Pikachu/i);
    expect(type).toHaveTextContent(/Electric/i);
    expect(weight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(img).toHaveAttribute('src', URL);
    expect(img).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('O card contém o link para mais detalhes e sua navegação funciona', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Pokémons favoritados contém uma imagem de uma estrela', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);
    const favoriteButton = screen.getByLabelText(/Pokémon favoritado/i);
    userEvent.click(favoriteButton);
    const star = screen.getByAltText(/is marked as favorite/i);
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
