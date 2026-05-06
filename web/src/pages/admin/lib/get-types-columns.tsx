import { type DataTableColumn } from "mantine-datatable";
import { Text } from "@mantine/core";
import { MenuButton } from "@/shared/ui/menu-button";
import type { V1TypeListListData } from "@/services/data-contracts";

export const getTypesColumns = (): DataTableColumn<
  V1TypeListListData[number]
>[] => {
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
      render: () => <MenuButton />,
    },
  ];
};
