import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import KeySkills from '../components/KeySkills';
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

// компонент не рабочий , одной проверки хватит)))
describe('KeySkills', () => {
  it('Добавляем новый тег(скилл) в инпут через Enter', async () => {
    const onChange = vi.fn();
    render(
      <MantineProvider>
        <KeySkills skills={[]} onChange={onChange} />
      </MantineProvider>
    );

    const input = screen.getByPlaceholderText(/навык/i);
    await userEvent.type(input, 'React{Enter}');

    expect(onChange).toHaveBeenCalledWith(['React']);
  });
});
