import {
  Flex,
  Group,
  Text,
  Pagination as MantinePagination,
} from "@mantine/core";
import ArrowLeft from "@shared/assets/arrow-left.svg?react";
import ArrowRight from "@shared/assets/arrow-right.svg?react";
import { useSearchParams } from "react-router-dom";
import styles from "./styles.module.css";

type PaginationProps = {
  totalItems: number;
  limit?: number;
};

export const Pagination = ({ totalItems, limit = 10 }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const skip = Number(searchParams.get("skip") ?? 0);
  const from = skip;
  const to = skip + limit;
  const currentPage = skip / limit + 1;

  const showArrow = totalItems > limit;

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
        onChange={(page) => {
          const skipItems = (page - 1) * limit;
          if (skipItems < totalItems) {
            setSearchParams((prevState) => {
              return {
                ...Object.fromEntries(prevState),
                skip: String(skipItems),
                limit: limit.toString(),
              };
            });
          }
        }}
        total={totalItems / limit}
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
