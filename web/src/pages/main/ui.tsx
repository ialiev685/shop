import { NavigationCrumbs } from "@/entities/navigation-crumbs/ui";
import { Header } from "@/features/header/ui";
import { ResponsiveContainer } from "@/shared/ui/responsive-container";
import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";

export const Main = () => {
  return (
    <AppShell bg="bg-shop-page" mih="100vh">
      <AppShell.Header h={56}>
        <Header />
      </AppShell.Header>
      <AppShell.Main pt={56}>
        <ResponsiveContainer>
          <NavigationCrumbs />
          <Outlet />
        </ResponsiveContainer>
      </AppShell.Main>
    </AppShell>
  );
};
