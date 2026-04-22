import { Header } from "@/features/header/ui";
import { AppShell } from "@mantine/core";

export const Main = () => {
  return (
    <AppShell bg="gray-shop-1" h="100vh">
      <Header />
    </AppShell>
  );
};
