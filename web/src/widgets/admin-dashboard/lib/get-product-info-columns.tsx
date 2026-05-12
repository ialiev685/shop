import { type DataTableColumn } from "mantine-datatable";
import { Flex, Text, Menu } from "@mantine/core";
import { MenuButton } from "@/shared/ui/menu-button";
import type { V1AllProductInfoListListData } from "@/services/data-contracts";

export const getProductInfoColumns = (
  onRemove: (id: number) => Promise<void>,
): DataTableColumn<V1AllProductInfoListListData["data"][number]>[] => {
  return [
    {
      accessor: "name",
      width: 200,
      title: (
        <Text fw="bold" c="gray-main-4">
          Наименование
        </Text>
      ),
      render: (record) => (
        <Flex direction="column" gap={10}>
          <Text fw="bold">{record.name}</Text>
          <Text fz={14} c="gray-main-4">
            {record.product.name}
          </Text>
        </Flex>
      ),
    },

    {
      accessor: "description",
      width: 400,
      title: (
        <Text fw="bold" c="gray-main-4">
          Описание
        </Text>
      ),
      render: (record) => <Text>{record.description}</Text>,
    },
    {
      accessor: "",
      width: 60,
      render: (record) => (
        <Menu>
          <Menu.Target>
            <MenuButton />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => onRemove(record.id)}>Удалить</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ),
    },
  ];
};
