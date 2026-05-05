import { Pagination } from "@/entities/pagination";
import {
  Button,
  Flex,
  Group,
  Tabs as MantineTabs,
  useMantineTheme,
} from "@mantine/core";
import { getProductsColumns } from "../lib/get-products-columns";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AddProductForm,
  AddTypeForm,
  productQueries,
  Table,
} from "@/entities/admin";
import { typeQueries } from "@/entities/admin/api/type-queries";
import { getTypesColumns } from "../lib/get-types-columns";
import { IconCirclePlus, IconRefresh } from "@tabler/icons-react";
import { useSearchParamsState } from "@/shared/hooks/use-search-params-state";

export const Tabs = () => {
  const { getParam, setParam } = useSearchParamsState();

  const productListQuery = useQuery(productQueries.getAll);
  const typeListQuery = useQuery(typeQueries.get);
  const theme = useMantineTheme();
  const queryClient = useQueryClient();

  return (
    <MantineTabs
      value={getParam("tab")}
      onChange={(value) => {
        if (!value) return;
        setParam({ tab: value });
      }}
    >
      <MantineTabs.List>
        <MantineTabs.Tab value="types">Типы</MantineTabs.Tab>
        <MantineTabs.Tab value="products">Продукты</MantineTabs.Tab>
      </MantineTabs.List>
      <MantineTabs.Panel value="types">
        <Flex gap={24} direction="column" mt={24}>
          <Group gap={8} justify="flex-end">
            <Button variant="outline-admin" radius={8}>
              <IconRefresh
                color={theme.colors["gray-auth-3"][0]}
                onClick={() => {
                  queryClient.invalidateQueries({
                    queryKey: typeQueries.typeListKey,
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
            data={typeListQuery.data}
            isLoading={typeListQuery.isLoading}
            columns={getTypesColumns()}
          />
          <Pagination totalItems={0} />
        </Flex>
      </MantineTabs.Panel>
      <MantineTabs.Panel value="products">
        <Flex gap={24} direction="column" mt={24}>
          <Group gap={8} justify="flex-end">
            <Button variant="outline-admin" radius={8}>
              <IconRefresh
                color={theme.colors["gray-auth-3"][0]}
                onClick={() => {
                  queryClient.invalidateQueries({
                    queryKey: typeQueries.typeListKey,
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
            data={productListQuery.data}
            isLoading={productListQuery.isLoading}
            columns={getProductsColumns()}
          />
          <Pagination totalItems={0} />
        </Flex>
      </MantineTabs.Panel>
    </MantineTabs>
  );
};
