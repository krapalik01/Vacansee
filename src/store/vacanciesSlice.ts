import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Vacancy } from '../types/vacancy';

export const fetchVacancies = createAsyncThunk(
  'vacancies/fetchVacancies',
  async (paramsString: string) => {
    // Формируем первый запрос по названию вакансии
    const paramsName = new URLSearchParams(paramsString);
    paramsName.set('search_field', 'name');

    const responseName = await fetch(
      `https://api.hh.ru/vacancies?industry=7&professional_role=96&${paramsName.toString()}`
    );
    if (!responseName.ok) throw new Error(`Ошибка ${responseName.status}`);
    const dataName = await responseName.json();

    // Формируем второй запрос по названию компании
    const paramsCompany = new URLSearchParams(paramsString);
    paramsCompany.set('search_field', 'company_name');

    const responseCompany = await fetch(
      `https://api.hh.ru/vacancies?industry=7&professional_role=96&${paramsCompany.toString()}`
    );
    if (!responseCompany.ok)
      throw new Error(`Ошибка ${responseCompany.status}`);
    const dataCompany = await responseCompany.json();

    // Объединяем результаты без дублирования по id вакансии
    const mergedMap = new Map<string | number, Vacancy>();
    dataName.items.forEach((vacancy: Vacancy) =>
      mergedMap.set(vacancy.id, vacancy)
    );
    dataCompany.items.forEach((vacancy: Vacancy) =>
      mergedMap.set(vacancy.id, vacancy)
    );

    // Возвращаем объединенный массив и примерное число страниц
    return {
      items: Array.from(mergedMap.values()),
      pages: Math.max(dataName.pages, dataCompany.pages),
    };
  }
);

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

interface VacanciesState {
  items: Vacancy[];
  status: StatusType;
  error: string | null;
  totalPages: number;
  currentPage: number;
  filters: {
    searchText: string;
    city: string;
    snippetRequirement: string[];
  };
}

const initialState: VacanciesState = {
  items: [],
  status: 'idle',
  error: null,
  totalPages: 0,
  currentPage: 1,
  filters: {
    searchText: '',
    city: '',
    snippetRequirement: ['TypeScript', 'React', 'Redux'],
  },
};

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilter(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // сбрасываем страницу при изменении фильтра
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.totalPages = action.payload.pages;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Неизвестная ошибка';
      });
  },
});

export const { setCurrentPage, setFilter } = vacanciesSlice.actions;
export default vacanciesSlice.reducer;
