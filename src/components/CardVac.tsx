import { Card, Text, Badge, Button, Group, Stack } from '@mantine/core';
import type { CardVacProps, WorkFormatName } from '../types/vacancy';

const formatColors: Record<WorkFormatName, string> = {
  'На месте работодателя': 'grey',
  Гибрид: 'black',
  Удалённо: 'blue',
};

function CardVac({
  title,
  salary,
  experience,
  company,
  work_format,
  location,
  url, // ссылка на вакансию
}: CardVacProps) {
  return (
    // Тайтл
    <Card mb="16" w="659" padding="24" radius="md">
      <Text mt="-12" size="xl" c="#4263EB" fw="500">
        {title}
      </Text>
      <Group mb="8">
        <Text>{salary}</Text>
        <Text size="sm" c="dimmed">
          {experience}
        </Text>
      </Group>

      {/* Инфо */}
      <Stack gap="8">
        <Text size="sm" c="dimmed">
          {company}
        </Text>
        <Group gap="4">
          {work_format && work_format.length > 0 ? (
            work_format.map((item) => (
              <Badge
                key={item.id}
                size="sm"
                color={formatColors[item.name as WorkFormatName] || 'gray'}
              >
                {item.name}
              </Badge>
            ))
          ) : (
            <Badge size="sm" color="gray">
              Не указано
            </Badge>
          )}
        </Group>
        <Text>{location}</Text>
      </Stack>

      {/* кнопки */}
      <Group>
        <Button color="black" mt="md" radius="md">
          Смотреть вакансию
        </Button>
        <Button
          component="a"
          href={url}
          target="_blank"
          color="#e5e5e5"
          mt="md"
          radius="md"
          style={{ color: 'black' }}
        >
          Откликнуться
        </Button>
      </Group>
    </Card>
  );
}

export default CardVac;
