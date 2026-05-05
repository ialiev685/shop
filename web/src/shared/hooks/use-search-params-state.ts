import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

export const useSearchParamsState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParam = useCallback(
    (params: Record<string, string>) => {
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev),
        ...params,
      }));
    },
    [setSearchParams],
  );

  const getParam = useCallback(
    (key: string) => searchParams.get(key),
    [searchParams],
  );

  return { setParam, getParam, searchParams };
};
