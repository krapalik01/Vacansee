import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { useState } from 'react';
import Search from '../components/Search';
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

describe('Search', () => {
  it('Проверка инпута с вводом текста и клик по кнопке + вызов onSearch', async () => {
    const onSearch = vi.fn();

    function Wrapper() {
      //Оказывается в тестах и так можно))
      const [searchText, setSearchText] = useState('');
      return (
        <MantineProvider>
          <Search
            searchText={searchText}
            setSearchText={setSearchText}
            onSearch={onSearch}
          />
        </MantineProvider>
      );
    }

    render(<Wrapper />);

    const input = screen.getByPlaceholderText(
      /должность или название компании/i
    );
    const button = screen.getByRole('button', { name: /найти/i });

    await userEvent.type(input, 'Frontend');
    expect(input).toHaveValue('Frontend');

    await userEvent.click(button);
    expect(onSearch).toHaveBeenCalled();
  });
});
