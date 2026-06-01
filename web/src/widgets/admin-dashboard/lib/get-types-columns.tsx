import { type DataTableColumn } from "mantine-datatable";
import { Text } from "@mantine/core";
import { MenuButton } from "@/shared/ui/menu-button";
import type { V1TypeListListData } from "@/services/data-contracts";
import { Menu } from "@mantine/core";

export const getTypesColumns = (
  onRemove: (productId: number) => Promise<void>,
): DataTableColumn<V1TypeListListData[number]>[] => {
  return [
    {
      accessor: "title",
      title: (
        <Text fw="bold" c="gray-main-4">
          Наименование
        </Text>
      ),
      render: (record) => <Text fw="bold">{record.name}</Text>,
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
