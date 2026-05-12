import { useAuth } from "@/app/providers/auth/context";
import { routesMap } from "@/app/routes";
import { AdminDashboard } from "@/widgets/admin-dashboard/ui";
import { Anchor, AppShell, Avatar, Flex, Menu, Text } from "@mantine/core";
import { Link } from "react-router-dom";

export const Admin = () => {
  const { user, logout } = useAuth();
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <Flex p={12} align="center" justify="flex-end">
          <Menu>
            <Menu.Target>
              <Avatar
                color="green-shop-1"
                name={user?.email}
                variant="filled"
                style={{ cursor: "pointer" }}
              />
            </Menu.Target>
            <Menu.Dropdown>
              {user?.email && (
                <Menu.Label>
                  <Text>{user?.email}</Text>
                </Menu.Label>
              )}
              {user?.role === "admin" && (
                <Menu.Item>
                  <Anchor
                    variant="text"
                    component={Link}
                    to={routesMap["/catalog"]}
                    underline="never"
                  >
                    Глвная
                  </Anchor>
                </Menu.Item>
              )}
              <Menu.Item>
                <Text onClick={logout}>Выйти</Text>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </AppShell.Header>
      <AppShell.Main h="calc(100vh - 60px)">
        <AdminDashboard />
      </AppShell.Main>
    </AppShell>
  );
};
