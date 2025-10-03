import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import Header from '../components/Header';
import { MantineProvider } from '@mantine/core';

// Мок window.matchMedia для корректной работы MantineProvider в тестах
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

describe('Header', () => {
  it('Проверка Header на рендер двух ссылок', async () => {
    render(
      <MantineProvider>
        <Header />
      </MantineProvider>
    );
    expect(screen.getByText(/Вакансии FE/i)).toBeInTheDocument();
    expect(screen.getByText(/Обо мне/i)).toBeInTheDocument();
  });
});
