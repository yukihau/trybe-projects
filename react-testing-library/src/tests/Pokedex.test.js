import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const nextTestId = 'next-pokemon';

describe('Testando o componente Pokedex', () => {
  test('A página contém um h2 com o texto correto', () => {
    renderWithRouter(<App />);
    const title = screen.getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
  });

  test('O botão "Próximo pokémon" está funcionando', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId(nextTestId);

    const pokemonList = ['Pikachu', 'Charmander', 'Caterpie',
      'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

    for (let index = 0; index < pokemonList.length; index += 1) {
      const pokemon = screen.getByText(pokemonList[index]);
      expect(pokemon).toBeInTheDocument();
      userEvent.click(button);
    }
  });

  test('É mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemonOnScreen = screen.getAllByText(/More details/i);
    expect(pokemonOnScreen.length).toBe(1);
  });

  test('Os botões de filtro da Pokédex existem e funcionam', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByTestId(nextTestId);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const amountOfButtons = 7;
    const filters = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const allButton = screen.getByText(/All/i);
    expect(filterButtons.length).toBe(amountOfButtons);
    for (let index = 0; index < filters.length; index += 1) {
      expect(filterButtons[index]).toHaveTextContent(filters[index]);
    }
    expect(allButton).toBeInTheDocument();

    userEvent.click(filterButtons[0]);
    userEvent.click(nextButton);
    let pokemonList = screen.getByText(/Pikachu/i);
    let currentType = screen.getAllByText(/Electric/i);
    expect(pokemonList).toBeInTheDocument();
    expect(currentType[0]).toBeInTheDocument();

    userEvent.click(filterButtons[1]);
    pokemonList = [screen.getByText(/Charmander/i)];
    userEvent.click(nextButton);
    pokemonList.push(screen.getByText(/Rapidash/i));
    currentType = screen.getAllByText(/Fire/i);
    expect(pokemonList).toHaveLength(2);
    expect(currentType[0]).toBeInTheDocument();
    expect(allButton).toBeInTheDocument();
  });

  test('O botão "All" reseta o filtro corretamente', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId(nextTestId);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const allButton = screen.getByText(/All/i);
    userEvent.click(filterButtons[0]);
    userEvent.click(allButton);

    const pokemonList = ['Pikachu', 'Charmander', 'Caterpie',
      'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

    for (let index = 0; index < pokemonList.length; index += 1) {
      const pokemon = screen.getByText(pokemonList[index]);
      expect(pokemon).toBeInTheDocument();
      userEvent.click(button);
    }
  });
});
