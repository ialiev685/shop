import { Header } from "@/features/header/ui";
import { ResponsiveContainer } from "@/shared/ui/responsive-container";
import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";

export const Main = () => {
  return (
    <AppShell bg="bg-shop-page" mih="100vh">
      <Header />
      <ResponsiveContainer>
        <Outlet />
      </ResponsiveContainer>
    </AppShell>
  );
};
