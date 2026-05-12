import { Pagination } from "@/entities/pagination";
import { Flex, Tabs as MantineTabs } from "@mantine/core";

import { useController } from "../model";
import { TABS_VALUE } from "../configs";
import { TabProductInfo } from "./tab-product-info";
import { TabProduct } from "./tab-product";
import { TabTypes } from "./tab-types";

export const Tabs = () => {
  const {
    productList,
    typeList,
    isLoading,
    handleRemoveType,
    handleRemoveProduct,
    handleRemoveProductInfo,
    setParam,
    getParam,
    productInfoList,
  } = useController();

  return (
    <Flex direction="column" gap={24}>
      <MantineTabs
        value={getParam("tab")}
        onChange={(value) => {
          if (!value) return;
          setParam({ tab: value });
        }}
      >
        <MantineTabs.List>
          <MantineTabs.Tab value={TABS_VALUE.types}>Типы</MantineTabs.Tab>
          <MantineTabs.Tab value={TABS_VALUE.products}>
            Продукты
          </MantineTabs.Tab>
          <MantineTabs.Tab value={TABS_VALUE.productInfo}>
            Характеристики
          </MantineTabs.Tab>
        </MantineTabs.List>
        <MantineTabs.Panel value={TABS_VALUE.types}>
          <TabTypes
            data={typeList ?? []}
            isLoading={isLoading}
            onRemove={handleRemoveType}
          />
        </MantineTabs.Panel>
        <MantineTabs.Panel value={TABS_VALUE.products}>
          <TabProduct
            data={productList?.data ?? []}
            isLoading={isLoading}
            onRemove={handleRemoveProduct}
          />
        </MantineTabs.Panel>
        <MantineTabs.Panel value={TABS_VALUE.productInfo}>
          <TabProductInfo
            data={productInfoList?.data ?? []}
            isLoading={isLoading}
            onRemove={handleRemoveProductInfo}
          />
        </MantineTabs.Panel>
      </MantineTabs>

      <Pagination
        totalItems={productInfoList?.pagination.total ?? 0}
        limit={productInfoList?.pagination.limit}
      />
    </Flex>
  );
};
