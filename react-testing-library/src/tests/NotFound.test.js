import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando o componente NotFound', () => {
  test('A página contém um heading h2 com o texto correto', () => {
    render(<NotFound />);
    const title = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  test('A página mostra a imagem correta', () => {
    render(<NotFound />);
    const IMAGE_URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(IMAGE_URL);
  });
});
