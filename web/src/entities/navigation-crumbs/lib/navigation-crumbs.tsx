import type { Route } from "@/shared/routes";
import type { LinkState, StoragePath } from "../ui/type";
import { matchPath } from "react-router-dom";
import { Anchor, Text } from "@mantine/core";
import { LinkWithState } from "../ui/link-with-state";

class NavigationCrumbs {
  private STORAGE_KEY = "crumb";

  private loadFromStorage(): StoragePath | undefined {
    const savePath = sessionStorage.getItem(this.STORAGE_KEY);
    if (savePath) {
      try {
        const path = JSON.parse(savePath) as Record<string, LinkState>;

        return path;
      } catch {
        return undefined;
      }
    }
  }

  private saveToStorage(currentRouteTemplate: Route, state?: LinkState) {
    const savedPaths = this.loadFromStorage();

    const currentPath: StoragePath = {
      [currentRouteTemplate.path]: state
        ? state
        : {
            title: currentRouteTemplate.title ?? "",
            to: currentRouteTemplate.path,
          },
    };

    sessionStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify({
        ...(savedPaths ? savedPaths : {}),
        ...currentPath,
      }),
    );
  }

  public createAnchors(
    routes: Route[],
    currentPath: string,
    state?: LinkState,
  ): React.ReactNode[] | null {
    for (const route of routes) {
      if (matchPath({ path: route.path, end: true }, currentPath)) {
        this.saveToStorage(route, state);
        return [
          <Text fz={12} key={route.path} c="gray-shop-1">
            {(state?.title ?? route.title) || "Название не определено"}
          </Text>,
        ];
      }
      if (route.children) {
        const childBreadcrumbs = this.createAnchors(
          route.children,
          currentPath,
          state,
        );
        if (childBreadcrumbs) {
          const savedPaths = this.loadFromStorage();
          const path =
            savedPaths && route.path in savedPaths
              ? savedPaths[route.path]
              : undefined;

          const to = path?.to ?? route.path;
          const title =
            (path?.title ?? route.title) || "Название не определено";

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
  }
}

export const navigationCrumbs = new NavigationCrumbs();
