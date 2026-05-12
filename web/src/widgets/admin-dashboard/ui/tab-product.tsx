import { Button, Flex, Group, useMantineTheme } from "@mantine/core";
import { getProductsColumns } from "../lib/get-products-columns";

import { IconCirclePlus, IconRefresh } from "@tabler/icons-react";
import { Table } from "@/entities/table/ui";
import { AddProductForm } from "@/features/add-product-form";
import { productQueries } from "@/entities/product";
import { useQueryClient } from "@tanstack/react-query";
import type { V1AllProductListListData } from "@/services/data-contracts";

interface TabProductProps {
  isLoading: boolean;
  data: V1AllProductListListData["data"];
  onRemove: (id: number) => Promise<void>;
}

export const TabProduct = ({ data, isLoading, onRemove }: TabProductProps) => {
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
                queryKey: productQueries.primaryKey,
              });
            }}
          />
        </Button>
        <AddProductForm
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
        columns={getProductsColumns(onRemove)}
        withSort
      />
    </Flex>
  );
};
