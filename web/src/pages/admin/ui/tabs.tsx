import { Pagination } from "@/entities/pagination";
import { Button, Flex, Group, Tabs as MantineTabs } from "@mantine/core";
import { getProductsColumns } from "../lib/get-products-columns";
import {
  AddProductForm,
  AddTypeForm,
  productQueries,
  Table,
} from "@/entities/admin";
import { typeQueries } from "@/entities/admin/api/type-queries";
import { getTypesColumns } from "../lib/get-types-columns";
import { IconCirclePlus, IconRefresh } from "@tabler/icons-react";
import { useController } from "../models";
import { TABS_VALUE } from "../configs";

export const Tabs = () => {
  const {
    productList,
    typeList,
    isLoading,
    handleRemoveType,
    handleRemoveProduct,
    theme,
    setParam,
    getParam,
    queryClient,
  } = useController();

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
            data={typeList}
            isLoading={isLoading}
            columns={getTypesColumns(handleRemoveType)}
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
            data={productList?.data}
            isLoading={isLoading}
            columns={getProductsColumns(handleRemoveProduct)}
            withSort
          />
          <Pagination
            totalItems={productList?.pagination.total ?? 0}
            limit={productList?.pagination.limit}
          />
        </Flex>
      </MantineTabs.Panel>
    </MantineTabs>
  );
};
