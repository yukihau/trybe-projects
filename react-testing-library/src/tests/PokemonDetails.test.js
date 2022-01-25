import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pikachuPath = '/pokemons/25';

describe('Testando o componente PokemonDetails', () => {
  test('A página é renderizada com os componentes esperados', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe(pikachuPath);

    const detailsTitle = screen.getByRole('heading', {
      name: /Pikachu Details/i,
      level: 2,
    });
    const summaryTitle = screen.getByRole('heading', {
      name: /Summary/i,
      level: 2,
    });
    const summaryParagraph = screen.getByText(/This intelligent Pokémon/i);

    expect(detailsTitle).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(summaryParagraph).toBeInTheDocument();
  });

  test('A página contém os mapas das localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe(pikachuPath);

    const mapTitle = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    const maps = screen.getAllByAltText(/Pikachu location/i);
    const mapLinks = [
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    ];
    const firstMapName = screen.getByText(/Kanto Viridian Forest/i);
    const secondMapName = screen.getByText(/Kanto Power Plant/i);

    expect(mapTitle).toBeInTheDocument();
    expect(maps).toHaveLength(2);
    expect(maps[0]).toHaveAttribute('src', mapLinks[0]);
    expect(maps[1]).toHaveAttribute('src', mapLinks[1]);
    expect(firstMapName).toBeInTheDocument();
    expect(secondMapName).toBeInTheDocument();
  });

  test('Pokémons favoritados contém uma imagem de uma estrela', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe(pikachuPath);

    const favoriteButton = screen.getByLabelText(/Pokémon favoritado/i);
    userEvent.click(favoriteButton);
    history.push('/favorites');
    const favoritePokemons = screen.getAllByText(/More details/i);
    expect(favoritePokemons[0]).toBeInTheDocument();
    expect(favoritePokemons.length).toBe(1);

    history.push(pikachuPath);
    userEvent.click(favoriteButton);
    history.push('/favorites');
    expect(favoritePokemons[0]).not.toBeInTheDocument();
  });
});
