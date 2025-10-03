import { useState } from 'react';
import { TagsInput, Button, Group, Stack, Text } from '@mantine/core';
import type { KeySkillsProps } from '../types/vacancy';

function KeySkills({ skills, onChange }: KeySkillsProps) {
  const [input, setInput] = useState('');

  // Добавление нового тэга по "+" или Enter
  const addSkill = () => {
    const skill = input.trim();
    if (skill && !skills.includes(skill)) {
      onChange([...skills, skill]);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addSkill();
  };

  return (
    <Stack p="md" w="317" style={{ background: '#fff', borderRadius: 12 }}>
      <Text fw={500} fz="md">
        Ключевые навыки
      </Text>
      <Group mb={4}>
        <input
          value={input}
          placeholder="Навык"
          style={{
            width: 227,
            border: '1px solid #e9ecef',
            borderRadius: 8,
            padding: 6,
            fontSize: 14,
            height: 30,
          }}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          color="blue"
          px={10}
          h="30"
          style={{ fontSize: 20 }}
          onClick={addSkill}
          disabled={!input.trim()}
        >
          +
        </Button>
      </Group>

      {/* Вывод тегов в нижнем инпуте */}
      <TagsInput
        variant="unstyled"
        value={skills}
        onChange={onChange}
        w="300"
        styles={{
          root: {
            fontSize: 15,
            padding: '0 12px',
            minHeight: 32,
          },
        }}
        maxTags={10}
      />
    </Stack>
  );
}

export default KeySkills;
