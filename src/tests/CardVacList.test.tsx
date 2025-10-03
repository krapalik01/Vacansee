import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import CardVacList from '../components/CardVacList';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import vacanciesReducer from '../store/vacanciesSlice';
import type { StatusType } from '../store/vacanciesSlice';

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

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          items,
          pages: 1,
        }),
    })
  ) as unknown as typeof fetch;
});

const items = [
  {
    id: '1',
    name: 'Frontend Developer',
    salary: '100000 - 150000 ₽',
    experience: 'Без опыта',
    employer: { name: 'Компания 1' },
    work_format: [{ id: 1, name: 'Удалённо' }],
    area: { name: 'Москва' },
    alternate_url: 'https://google.com/',
  },
  {
    id: '2',
    name: 'Backend Developer',
    salary: '120000 - 170000 ₽',
    experience: 'Опыт',
    employer: { name: 'Компания 2' },
    work_format: [{ id: 2, name: 'Гибрид' }],
    area: { name: 'Санкт-Петербург' },
    alternate_url: 'https://hh.ru/',
  },
];

const store = configureStore({
  reducer: {
    vacancies: vacanciesReducer,
  },
  preloadedState: {
    vacancies: {
      items,
      status: 'idle' as StatusType,
      error: null,
      currentPage: 1,
      totalPages: 1,
      filters: {
        searchText: '',
        city: '',
        snippetRequirement: [],
      },
    },
  },
});

describe('CardVacList', () => {
  it('Рендер списка вакансий', async () => {
    render(
      <Provider store={store}>
        <MantineProvider>
          <CardVacList />
        </MantineProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/frontend developer/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/backend developer/i)).toBeInTheDocument();
    expect(screen.getByText(/компания 1/i)).toBeInTheDocument();
    expect(screen.getByText(/удалённо/i)).toBeInTheDocument();
    expect(screen.getByText(/Санкт-Петербург/i)).toBeInTheDocument();
  });
});
