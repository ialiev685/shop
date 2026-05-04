import { type DataTableColumn } from "mantine-datatable";
import { Button, Group, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { MenuButton } from "@/shared/ui/menu-button";
import type { V1TypeListListData } from "@/services/data-contracts";

export const getTypesColumns = (): DataTableColumn<
  V1TypeListListData[number]
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
      render: (record) => <Text fw="bold">{record.name}</Text>,
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
