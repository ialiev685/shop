import type { Product } from "@/services/products-api";
import { type DataTableColumn } from "mantine-datatable";
import { Button, Flex, Group, Text, Image, Box } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { MenuButton } from "@/shared/ui/menu-button";

const noImage = (
  <Box
    w={48}
    h={48}
    bg="gray-main-3"
    bdrs={8}
    style={{
      border: "1px solid #9B51E0",
    }}
  ></Box>
);

export const getColumns = (): DataTableColumn<Product>[] => {
  return [
    {
      accessor: "title",
      width: 400,
      title: (
        <Text fw="bold" c="gray-main-4">
          Наименование
        </Text>
      ),
      render: (record) => (
        <Flex align="center" gap={18}>
          {record.images && record.images?.length > 0 ? (
            <Image
              w={48}
              h={48}
              radius={8}
              fit="cover"
              src={record.images?.[0]}
            />
          ) : (
            noImage
          )}
          <Flex direction="column" gap={10}>
            <Text fw="bold">{record.title}</Text>
            <Text fz={14} c="gray-main-4">
              {record.category}
            </Text>
          </Flex>
        </Flex>
      ),
    },
    {
      accessor: "brand",
      width: 200,
      title: (
        <Text fw="bold" c="gray-main-4">
          Вендор
        </Text>
      ),
      render: (record) => <Text fw="bold">{record.brand}</Text>,
    },
    {
      accessor: "sku",
      width: 200,
      title: (
        <Text fw="bold" c="gray-main-4">
          Артикул
        </Text>
      ),
      render: (record) => <Text>{record.sku}</Text>,
    },
    {
      accessor: "rating",
      width: 200,
      title: (
        <Text fw="bold" c="gray-main-4">
          Оценка
        </Text>
      ),
      render: (record) => (
        <Group gap={0}>
          <Text c={record.rating && record.rating < 3.5 ? "red" : undefined}>
            {record.rating}
          </Text>
          <Text>/5</Text>
        </Group>
      ),
    },
    {
      accessor: "price",
      width: 200,
      title: (
        <Text fw="bold" c="gray-main-4">
          Цена
        </Text>
      ),
      render: (record) => {
        const [integer = "0", decimal = "00"] =
          record.price?.toFixed(2).split(".") ?? [];

        return (
          <Group gap={0} component="span">
            <Text>
              {new Intl.NumberFormat("ru-RU").format(Number(integer))}
            </Text>
            <Text c="gray-main-4">,{decimal}</Text>
          </Group>
        );
      },
    },
    {
      accessor: "",
      width: 200,
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
