import { type DataTableColumn } from "mantine-datatable";
import { Button, Flex, Group, Text, Image, Box } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { MenuButton } from "@/shared/ui/menu-button";
import type { V1ProductListDetailData } from "@/services/data-contracts";

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

export const getProductsColumns = (): DataTableColumn<
  V1ProductListDetailData[number]
>[] => {
  return [
    {
      accessor: "title",
      sortable: true,
      width: 400,
      title: (
        <Text fw="bold" c="gray-main-4">
          Наименование
        </Text>
      ),
      render: (record) => (
        <Flex align="center" gap={18}>
          {record.img ? (
            <Image w={48} h={48} radius={8} fit="cover" src={record.img} />
          ) : (
            noImage
          )}
          <Flex direction="column" gap={10}>
            <Text fw="bold">{record.name}</Text>
            <Text fz={14} c="gray-main-4">
              {record.typeId}
            </Text>
          </Flex>
        </Flex>
      ),
    },

    {
      accessor: "sku",
      sortable: true,
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
      sortable: true,
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
      sortable: true,
      width: 200,
      title: (
        <Text fw="bold" c="gray-main-4">
          Цена
        </Text>
      ),
      render: (record) => {
        const [integer = "0", decimal = "00"] =
          Number(record.price)?.toFixed(2).split(".") ?? [];

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
