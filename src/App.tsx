import './App.css';
import CardVacList from './components/CardVacList';
import Header from './components/Header';
import Search from './components/Search';
import CitySelect from './components/CitySelect';
import KeySkills from './components/KeySkills';

import {
  MantineProvider,
  Container,
  Divider,
  Pagination,
  Stack,
  Flex,
} from '@mantine/core';
import '@mantine/core/styles.css';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchVacancies, setCurrentPage } from './store/vacanciesSlice';
import { setFilter } from './store/vacanciesSlice';
import type { CityKey } from './types/vacancy';

function App() {
  const dispatch = useAppDispatch();
  const { filters, currentPage, totalPages } = useAppSelector(
    (state) => state.vacancies
  );

  const skills = filters.snippetRequirement || [];

  const [searchText, setSearchText] = useState('');
  const city = filters.city || '';
  const cityMap: Record<CityKey, string> = {
    '': '',
    Москва: '1',
    'Санкт-Петербург': '2',
  };

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [filters.searchText, filters.city, skills]);
  // При изменении фильтров или currentPage - загрузка вакансий с нужными параметрами
  useEffect(() => {
    const baseParams = new URLSearchParams();

    if (filters.searchText?.trim()) {
      baseParams.append('text', filters.searchText.trim());
    }

    baseParams.append('skill_set', skills.join(' '));

    const cityId = city && city in cityMap ? cityMap[city as CityKey] : '';
    if (cityId) {
      baseParams.append('area', cityId);
    }

    const safePage =
      Number.isInteger(currentPage) && currentPage > 0 ? currentPage - 1 : 0;
    baseParams.append('per_page', '10');
    baseParams.append('page', safePage.toString());

    // Вызов thunk для поиска по name
    dispatch(fetchVacancies(baseParams.toString() + '&search_field=name'));

    // Вызов thunk для поиска по company_name
    dispatch(
      fetchVacancies(baseParams.toString() + '&search_field=company_name')
    );

    console.log(baseParams.toString());
  }, [dispatch, filters, currentPage, skills]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleSearchClick = () => {
    dispatch(setFilter({ searchText }));
  };

  const handleCityChange = (newCity: string | null) => {
    const cityKey: CityKey =
      newCity && newCity in cityMap ? (newCity as CityKey) : '';
    dispatch(setFilter({ city: cityKey }));
  };

  const handleSkillsChange = (newSkills: string[]) => {
    dispatch(setFilter({ snippetRequirement: newSkills }));
    dispatch(setCurrentPage(1));
  };
  return (
    <>
      <MantineProvider>
        <Header />
        <Container mb="24" size={1000} p="0">
          <Search
            searchText={searchText}
            setSearchText={setSearchText}
            onSearch={handleSearchClick}
          />
        </Container>
        <Divider mb="24" />
        <Container size={1000} p="0">
          <Flex gap="24">
            <Stack align="center">
              <KeySkills skills={skills} onChange={handleSkillsChange} />
              <CitySelect city={city} setCity={handleCityChange} />
            </Stack>
            <Stack gap="0" style={{ width: '100%' }}>
              <CardVacList />
              <Flex justify="center">
                <Pagination
                  mb="64"
                  withEdges
                  total={totalPages}
                  value={currentPage}
                  onChange={handlePageChange}
                />
              </Flex>
            </Stack>
          </Flex>
        </Container>
      </MantineProvider>
    </>
  );
}

export default App;
