import {
  Flex,
  Group,
  Text,
  Pagination as MantinePagination,
} from "@mantine/core";
import ArrowLeft from "@shared/assets/arrow-left.svg?react";
import ArrowRight from "@shared/assets/arrow-right.svg?react";
import styles from "./styles.module.css";
import { useSearchParamsState } from "@/shared/hooks/use-search-params-state";

type PaginationProps = {
  totalItems: number;
  limit?: number;
};

export const Pagination = ({ totalItems, limit = 10 }: PaginationProps) => {
  const { getParam, setParam } = useSearchParamsState();
  const page = Number(getParam("page") ?? 1);
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, totalItems);
  const currentPage = page;

  const showArrow = totalItems > limit;
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <Flex justify="space-between" align="center">
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
        onChange={(nextPage) => {
          setParam({
            page: String(nextPage),
            limit: limit.toString(),
          });
        }}
        total={totalPages}
        classNames={{ control: styles.paginationControl }}
      >
        <Group gap={8}>
          {showArrow && (
            <MantinePagination.Previous
              icon={ArrowLeft}
              style={{ border: "none" }}
            />
          )}
          <MantinePagination.Items />
          {showArrow && (
            <MantinePagination.Next
              icon={ArrowRight}
              style={{ border: "none" }}
            />
          )}
        </Group>
      </MantinePagination.Root>
    </Flex>
  );
};
