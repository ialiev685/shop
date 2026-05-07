import { Breadcrumbs } from "@mantine/core";
import { useLocation } from "react-router-dom";

import { IconArrowNarrowRight } from "@tabler/icons-react";
import { routes } from "@/app/routes";
import { navigationCrumbs } from "../lib/navigation-crumbs";

export const NavigationCrumbs = () => {
  const location = useLocation();
  const anchors = navigationCrumbs.createAnchors(
    routes,
    location.pathname,
    location.state,
  );

  return (
    <Breadcrumbs pb={12} separator={<IconArrowNarrowRight size={12} />}>
      {anchors}
    </Breadcrumbs>
  );
};
