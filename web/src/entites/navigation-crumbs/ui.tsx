import { Breadcrumbs, Anchor, Text } from "@mantine/core";
import { Link, useLocation, matchPath } from "react-router-dom";

import { IconArrowNarrowRight } from "@tabler/icons-react";
import { routes, type Route } from "@/shared/routes";

const createAnchors = (
  routes: Route[],
  currentPath: string,
  prefix: string = "/",
): React.ReactNode[] | null => {
  for (const route of routes) {
    const fullPath = prefix + route.path;
    if (matchPath({ path: fullPath, end: true }, currentPath)) {
      return [
        <Text fz={12} key={fullPath} c="gray-shop-1">
          {route.dynamicTitle ? "Динамическое название" : route.title}
        </Text>,
      ];
    }
    if (route.children) {
      const childBreadcrumbs = createAnchors(route.children, currentPath);
      if (childBreadcrumbs) {
        return [
          <Anchor
            key={fullPath}
            component={Link}
            to={fullPath}
            fz={12}
            c="gray-shop-1"
          >
            {route.dynamicTitle ? "Динамическое название" : route.title}
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
  const anchors = createAnchors(routes, location.pathname);

  return (
    <Breadcrumbs pb={12} separator={<IconArrowNarrowRight size={12} />}>
      {anchors}
    </Breadcrumbs>
  );
};
