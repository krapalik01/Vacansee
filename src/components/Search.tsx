import {
  Title,
  Text,
  TextInput,
  Button,
  Group,
  Flex,
  Stack,
} from '@mantine/core';
import type { SearchProps } from '../types/vacancy';

function Search({ searchText, setSearchText, onSearch }: SearchProps) {
  return (
    <>
      <Flex justify="space-between">
        <Stack w="366">
          <Title mt="14" order={2}>
            Список вакансий
          </Title>
          <Text mt="-12" fz="xl" c="dimmed">
            по профессии Frontend-разработчик
          </Text>
        </Stack>
        <Group mt="20">
          <TextInput
            value={searchText}
            onChange={(e) => setSearchText(e.currentTarget.value)}
            styles={{
              input: {
                backgroundColor: '#f5f5f7',
              },
            }}
            w="403"
            placeholder="Должность или название компании"
            leftSection={
              <img
                src="/search.svg"
                alt="search icon"
                style={{ width: 16, height: 16 }}
              />
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearch();
              }
            }}
          />
          <Button onClick={onSearch} w="93">
            Найти
          </Button>
        </Group>
      </Flex>
    </>
  );
}

export default Search;
