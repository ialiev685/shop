import { currentUser, logout } from "@/services/requests/auth";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const keys = {
  currentUserKey: ["currentUser"],
};

export const userQueries = {
  ...keys,
  logoutMutation: mutationOptions({ mutationFn: logout }),
  currentUserQuery: queryOptions({
    queryKey: keys.currentUserKey,
    queryFn: currentUser,
    retry: 0,
  }),
};
