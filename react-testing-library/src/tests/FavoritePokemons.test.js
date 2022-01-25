import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testando o componente About', () => {
  test('No caso de não ter nenhum favorito, exibe na tela a menságem respectiva', () => {
    render(<FavoritePokemons />);
    const noFavoritesText = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoritesText).toBeInTheDocument();
  });

  test('É exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    let detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });

    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');

    let favoriteButton = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);

    history.push('/');
    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);

    detailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe('/pokemons/4');

    favoriteButton = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);

    history.push('/favorites');
    const cards = screen.getAllByRole('img', {
      name: /is marked as favorite/i,
    });
    expect(cards.length).toBe(2);
  });
});
