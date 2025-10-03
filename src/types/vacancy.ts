export interface WorkFormat {
  id: string | number;
  name: string;
}

export interface CardVacProps {
  title: string;
  salary: string;
  experience: string;
  company?: string;
  work_format?: WorkFormat[];
  location?: string;
  url: string;
}

export interface Vacancy {
  id: string | number;
  name: string;
  salary:
    | string
    | {
        from?: number;
        to?: number;
        currency?: string;
      }
    | null;
  experience: string | { name: string } | null;
  employer?: {
    name: string;
  } | null;
  work_format?: WorkFormat[];
  area?: {
    name: string;
  } | null;
  alternate_url: string;
}

export interface CardVacListProps {
  items: Vacancy[];
}

export interface CitySelectProps {
  city: string;
  setCity: (city: string | null) => void;
}

export interface KeySkillsProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export interface SearchProps {
  searchText: string;
  setSearchText: (text: string) => void;
  onSearch: () => void;
}

export type CityKey = '' | 'Москва' | 'Санкт-Петербург';

export type WorkFormatName = 'На месте работодателя' | 'Гибрид' | 'Удалённо';