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
import type { V1AllProductListListParams } from "@/services/data-contracts";
import { PAGINATION } from "@/shared/configs";

const TABS_VALUE = {
  types: "types",
  products: "products",
} as const;

export const Tabs = () => {
  const { getParam, setParam } = useSearchParamsState();

  const productListQuery = useQuery({
    ...productQueries.getAll({
      search: getParam("search"),
      page: Number(getParam("page")) || PAGINATION.PAGE,
      limit: Number(getParam("limit")) || PAGINATION.LIMIT,
      sortBy: getParam("sortBy"),
      sortOrder: (
        getParam("order") || ""
      ).toUpperCase() as V1AllProductListListParams["sortOrder"],
    }),
    enabled: getParam("tab") === TABS_VALUE.products,
  });

  const typeListQuery = useQuery({
    ...typeQueries.get({ search: getParam("search") }),
    enabled: getParam("tab") === TABS_VALUE.types,
  });
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
        <MantineTabs.Tab value={TABS_VALUE.types}>Типы</MantineTabs.Tab>
        <MantineTabs.Tab value={TABS_VALUE.products}>Продукты</MantineTabs.Tab>
      </MantineTabs.List>
      <MantineTabs.Panel value={TABS_VALUE.types}>
        <Flex gap={24} direction="column" mt={24}>
          <Group gap={8} justify="flex-end">
            <Button variant="outline-admin" radius={8}>
              <IconRefresh
                color={theme.colors["gray-auth-3"][0]}
                onClick={() => {
                  queryClient.invalidateQueries({
                    queryKey: typeQueries.typeListKey(),
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
        </Flex>
      </MantineTabs.Panel>
      <MantineTabs.Panel value={TABS_VALUE.products}>
        <Flex gap={24} direction="column" mt={24}>
          <Group gap={8} justify="flex-end">
            <Button variant="outline-admin" radius={8}>
              <IconRefresh
                color={theme.colors["gray-auth-3"][0]}
                onClick={() => {
                  queryClient.invalidateQueries({
                    queryKey: productQueries.productListAllKey({}),
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
            data={productListQuery.data?.data}
            isLoading={productListQuery.isLoading}
            columns={getProductsColumns()}
            withSort
          />
          <Pagination
            totalItems={productListQuery.data?.pagination.total ?? 0}
            limit={productListQuery.data?.pagination.limit}
          />
        </Flex>
      </MantineTabs.Panel>
    </MantineTabs>
  );
};
