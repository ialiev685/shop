import type {
  V1AllProductInfoListListData,
  V1AllProductListListData,
} from "@/services/data-contracts";

interface Pagination {
  pagination: { total: number; limit: number };
}

export interface TabProductProps extends Pagination {
  isLoading: boolean;
  data: V1AllProductListListData["data"];
  onRemove: (id: number) => Promise<void>;
}

export interface TabProductInfoProps extends Pagination {
  isLoading: boolean;
  data: V1AllProductInfoListListData["data"];
  onRemove: (id: number) => Promise<void>;
}
