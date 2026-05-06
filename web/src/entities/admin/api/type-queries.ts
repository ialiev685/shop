import type { V1TypeListListParams } from "@/services/data-contracts";
import { typeList, addType } from "@/services/requests/api";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const typeKeys = {
  typeListKey: (params?: V1TypeListListParams) => ["typeList", params],
};

export const typeQueries = {
  ...typeKeys,
  get: (params: V1TypeListListParams) =>
    queryOptions({
      queryKey: typeKeys.typeListKey(params),
      queryFn: () => typeList(params),
    }),
  add: mutationOptions({ mutationFn: addType }),
};
