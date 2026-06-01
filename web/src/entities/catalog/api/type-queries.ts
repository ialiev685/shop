import type { V1TypeListListParams } from "@/services/data-contracts";
import { typeList, addType, removeType } from "@/services/requests/api";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const PRIMARY_KEY = "typeList";

const typeKeys = {
  primaryKey: [PRIMARY_KEY],
  typeListKey: (params?: V1TypeListListParams) => [PRIMARY_KEY, params],
};

export const typeQueries = {
  ...typeKeys,
  get: (params: V1TypeListListParams) =>
    queryOptions({
      queryKey: typeKeys.typeListKey(params),
      queryFn: () => typeList(params),
    }),
  add: mutationOptions({ mutationFn: addType }),
  delete: mutationOptions({
    mutationFn: removeType,
  }),
};
