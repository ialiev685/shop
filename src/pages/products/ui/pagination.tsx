import {
  Flex,
  Group,
  Text,
  Pagination as MantinePagination,
  useMantineTheme,
} from "@mantine/core";
import ArrowLeft from "@shared/assets/arrow-left.svg?react";
import ArrowRight from "@shared/assets/arrow-right.svg?react";

export const Pagination = () => {
  const page = 1;
  const total = 194;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(total / itemsPerPage);
  const from = (page - 1) * itemsPerPage + 1;
  const to = Math.min(page * itemsPerPage, total);
  const theme = useMantineTheme();

  return (
    <Flex justify="space-between" align="center" mt={50}>
      <Group gap={4}>
        <Text fz={18} c="gray-main-3">
          Показано
        </Text>
        <Text fz={18}>
          {from}-{to}
        </Text>
        <Text fz={18} c="gray-main-3">
          из
        </Text>
        <Text fz={18}>{total}</Text>
      </Group>

      <MantinePagination.Root
        value={page}
        onChange={() => {}}
        total={totalPages}
        styles={{
          control: {
            border: `1px solid ${theme.colors["purple-main"][0]}`,
          },
        }}
      >
        <Group gap={8}>
          <MantinePagination.Previous
            icon={ArrowLeft}
            style={{ border: "none" }}
          />
          <MantinePagination.Items />
          <MantinePagination.Next
            icon={ArrowRight}
            style={{ border: "none" }}
          />
        </Group>
      </MantinePagination.Root>
    </Flex>
  );
};
