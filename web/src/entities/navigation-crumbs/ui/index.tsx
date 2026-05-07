import { Breadcrumbs, Anchor, Text } from "@mantine/core";
import { useLocation, matchPath } from "react-router-dom";

import { IconArrowNarrowRight } from "@tabler/icons-react";
import { routes, type Route } from "@/shared/routes";
import type { LinkState } from "./type";
import { LinkWithState } from "./link-with-state";

const STORAGE_KEY = "crumb";
type StoragePath = Record<string, LinkState>;

const loadFromStorage = (): StoragePath | undefined => {
  const savePath = sessionStorage.getItem(STORAGE_KEY);
  if (savePath) {
    try {
      const path = JSON.parse(savePath) as Record<string, LinkState>;

      return path;
    } catch {
      return undefined;
    }
  }
};

const saveToStorage = (currentRouteTemplate: Route, state?: LinkState) => {
  const savedPaths = loadFromStorage();

  const currentPath: StoragePath = {
    [currentRouteTemplate.path]: state
      ? state
      : {
          title: currentRouteTemplate.title ?? "",
          to: currentRouteTemplate.path,
        },
  };

  sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...(savedPaths ? savedPaths : {}),
      ...currentPath,
    }),
  );
};

const createAnchors = (
  routes: Route[],
  currentPath: string,
  state?: LinkState,
): React.ReactNode[] | null => {
  for (const route of routes) {
    if (matchPath({ path: route.path, end: true }, currentPath)) {
      saveToStorage(route, state);
      return [
        <Text fz={12} key={route.path} c="gray-shop-1">
          {(state?.title ?? route.title) || "Название не определено"}
        </Text>,
      ];
    }
    if (route.children) {
      const childBreadcrumbs = createAnchors(
        route.children,
        currentPath,
        state,
      );
      if (childBreadcrumbs) {
        const savedPaths = loadFromStorage();
        const path =
          savedPaths && route.path in savedPaths
            ? savedPaths[route.path]
            : undefined;

        const to = path?.to ?? route.path;
        const title = (path?.title ?? route.title) || "Название не определено";

        return [
          <Anchor
            key={route.path}
            component={LinkWithState}
            to={to}
            fz={12}
            c="gray-shop-1"
            title={title}
          >
            {title}
          </Anchor>,
          ...childBreadcrumbs,
        ];
      }
    }
  }
  return null;
};

export const NavigationCrumbs = () => {
  const location = useLocation();
  const anchors = createAnchors(routes, location.pathname, location.state);
  console.log("location", location);
  return (
    <Breadcrumbs pb={12} separator={<IconArrowNarrowRight size={12} />}>
      {anchors}
    </Breadcrumbs>
  );
};
