import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import type { DataTableSortStatus } from "mantine-datatable";

type QueryParams = {
  page?: string;
  limit?: string;
  search?: string;
  sortBy?: string;
  order?: DataTableSortStatus["direction"];
  tab?: string;
};

export const useSearchParamsState = <T extends QueryParams>() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParam = useCallback(
    (params: T) => {
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev),
        ...params,
      }));
    },
    [setSearchParams],
  );

  const getParam = useCallback(
    (key: keyof T) => searchParams.get(key as string) ?? undefined,
    [searchParams],
  );

  return { setParam, getParam, searchParams };
};
