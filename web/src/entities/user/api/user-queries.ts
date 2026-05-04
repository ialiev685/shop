import { currentUser, logout } from "@/services/requests/auth";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

const userKeys = {
  currentUserKey: ["currentUser"],
};

export const userQueries = {
  ...userKeys,
  logoutMutation: mutationOptions({ mutationFn: logout }),
  currentUserQuery: queryOptions({
    queryKey: userKeys.currentUserKey,
    queryFn: currentUser,
    retry: 0,
  }),
};
