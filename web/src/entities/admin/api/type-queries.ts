import { typeList, addType } from "@/services/requests/api";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const typeKeys = {
  typeListKey: ["typeList"],
};

export const typeQueries = {
  ...typeKeys,
  get: queryOptions({
    queryKey: typeKeys.typeListKey,
    queryFn: () => typeList(),
  }),
  add: mutationOptions({ mutationFn: addType }),
};
