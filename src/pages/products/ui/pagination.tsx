import {
  Flex,
  Group,
  Text,
  Pagination as MantinePagination,
  useMantineTheme,
} from "@mantine/core";
import ArrowLeft from "@shared/assets/arrow-left.svg?react";
import ArrowRight from "@shared/assets/arrow-right.svg?react";
import { useSearchParams } from "react-router-dom";

type PaginationProps = {
  totalItems: number;
  limit: number;
};

export const Pagination = ({ totalItems, limit = 10 }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const skip = Number(searchParams.get("skip") ?? 0);
  const from = skip;
  const to = skip + limit;
  const currentPage = skip / limit + 1;

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
        <Text fz={18}>{totalItems}</Text>
      </Group>

      <MantinePagination.Root
        value={currentPage}
        onChange={(page) => {
          const skipItems = (page - 1) * currentPage * limit;
          setSearchParams({ skip: String(skipItems), limit: limit.toString() });
        }}
        total={totalItems}
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
