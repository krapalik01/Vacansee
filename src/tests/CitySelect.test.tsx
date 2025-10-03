import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import CitySelect from '../components/CitySelect';
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
// ещё один фикс проблем Мантина при тестах
beforeAll(() => {
  Element.prototype.scrollIntoView = () => {};
});

describe('CitySelect', () => {
  it('Рендер выбора города + смена на СПБ', async () => {
    const setCity = vi.fn();
    render(
      <MantineProvider>
        <CitySelect city="Москва" setCity={setCity} />
      </MantineProvider>
    );

    const select = screen.getByRole('textbox');
    expect(select).toHaveValue('Москва');

    await userEvent.click(select);
    const spbOption = screen.getByText('Санкт-Петербург');
    await userEvent.click(spbOption);

    expect(setCity).toHaveBeenCalledWith('Санкт-Петербург', expect.any(Object));
  });
});
