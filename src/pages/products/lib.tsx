import type { Product } from "@/services/products-api";
import { type DataTableColumn } from "mantine-datatable";
import { Button, Group } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { MenuButton } from "@/shared/ui/menu-button";

export const getColumns = (): DataTableColumn<Product>[] => {
  return [
    {
      accessor: "title",
      title: "Наименование",
      render: (record) => record.title,
    },
    {
      accessor: "brand",
      title: "Вендор",
      render: (record) => record.brand,
    },
    {
      accessor: "sku",
      title: "Артикул",
      render: (record) => record.sku,
    },
    {
      accessor: "rating",
      title: "Оценка",
      render: (record) => record.rating,
    },
    {
      accessor: "price",
      title: "Цена",
      render: (record) => record.price,
    },
    {
      accessor: "",
      render: () => (
        <Group gap={32}>
          <Button radius={22} size="xs" h={27}>
            <IconPlus />
          </Button>
          <MenuButton />
        </Group>
      ),
    },
  ];
};
