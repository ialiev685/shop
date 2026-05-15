import { Button, Flex, Group, useMantineTheme } from "@mantine/core";

import { IconCirclePlus, IconRefresh } from "@tabler/icons-react";
import { Table } from "@/entities/table/ui";
import { getProductInfoColumns } from "../lib/get-product-info-columns";
import { useQueryClient } from "@tanstack/react-query";
import { productInfoQueries } from "@/entities/product-info/api/product-info-queries";
import { AddProductInfoForm } from "@/features/add-product-info-form/ui";
import type { TabProductInfoProps } from "./types";
import { Pagination } from "@/entities/pagination";

export const TabProductInfo = ({
  isLoading,
  data,
  onRemove,
  pagination,
}: TabProductInfoProps) => {
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  return (
    <Flex gap={24} direction="column" mt={24}>
      <Group gap={8} justify="flex-end">
        <Button variant="outline-admin" radius={8}>
          <IconRefresh
            color={theme.colors["gray-auth-3"][0]}
            onClick={() => {
              queryClient.invalidateQueries({
                queryKey: productInfoQueries.primaryKey,
              });
            }}
          />
        </Button>
        <AddProductInfoForm
          triggerButton={
            <Button
              radius={6}
              leftSection={<IconCirclePlus size={22} />}
              fw="normal"
            >
              Добавить
            </Button>
          }
        />
      </Group>
      <Table
        data={data}
        isLoading={isLoading}
        columns={getProductInfoColumns(onRemove)}
      />
      <Pagination totalItems={pagination.total} limit={pagination.limit} />
    </Flex>
  );
};
