import { Button, Flex, Group, useMantineTheme } from "@mantine/core";

import { IconCirclePlus, IconRefresh } from "@tabler/icons-react";
import { Table } from "@/entities/table/ui";
import { useQueryClient } from "@tanstack/react-query";
import type { V1TypeListListData } from "@/services/data-contracts";
import { typeQueries } from "@/entities/catalog";

import { getTypesColumns } from "../lib/get-types-columns";
import { AddTypeForm } from "@/features/add-type-form/ui";

interface TabProductProps {
  isLoading: boolean;
  data: V1TypeListListData;
  onRemove: (id: number) => Promise<void>;
}

export const TabTypes = ({ data, isLoading, onRemove }: TabProductProps) => {
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
                queryKey: typeQueries.primaryKey,
              });
            }}
          />
        </Button>
        <AddTypeForm
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
        columns={getTypesColumns(onRemove)}
      />
    </Flex>
  );
};
