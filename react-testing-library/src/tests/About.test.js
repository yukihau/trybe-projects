import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testando o componente About', () => {
  test('A página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const aboutFirstParagraph = screen
      .getByText(/This application simulates a Pokédex/i);
    const aboutSecondParagraph = screen
      .getByText(/One can filter Pokémons by type/i);
    expect(aboutFirstParagraph).toBeInTheDocument();
    expect(aboutSecondParagraph).toBeInTheDocument();
  });

  test('A página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const aboutTitle = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(aboutTitle).toBeInTheDocument();
  });

  test('A página contém a imagem correta da Pokédex', () => {
    render(<About />);
    const { src } = screen.getByRole('img', {
      name: /Pokédex/i,
    });
    const EXPECTED_URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(src).toBe(EXPECTED_URL);
  });
});
