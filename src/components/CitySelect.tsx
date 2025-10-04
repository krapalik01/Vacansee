import { Select } from '@mantine/core';
import type { CitySelectProps } from '../types/vacancy';

const cityData = [
  { value: 'Все города', label: 'Все города' },
  { value: 'Москва', label: 'Москва' },
  { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
];

function CitySelect({ city, setCity }: CitySelectProps) {
  return (
    <Select
      w="269"
      leftSection={
        <img
          src="/Vacansee/mapPin.svg"
          alt="mapPin icon"
          style={{ width: 16, height: 16 }}
        />
      }
      data={cityData}
      value={city === '' ? null : city}
      onChange={setCity}
      placeholder="Выберите город"
      clearable
    />
  );
}

export default CitySelect;
