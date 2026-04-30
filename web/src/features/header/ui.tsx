import { Sections } from "@/entities/sections";
import { routesMap } from "@/shared/routes";

import { ResponsiveContainer } from "@/shared/ui/responsive-container";
import { Flex, Drawer, Title, Group, Menu, Avatar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu2, IconBasket } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Text } from "@mantine/core";
import { useAuth } from "@/app/providers/auth/context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userQueries } from "@/entities/user";
import { TOKEN_KEY } from "@/shared/configs";

export const Header = () => {
  const [isOpen, { close, toggle }] = useDisclosure(false);
  const { isAuthorized, user } = useAuth();
  const logoutMutation = useMutation(userQueries.logoutMutation);
  const queryclient = useQueryClient();
  const handleLogout = async () => {
    await logoutMutation.mutateAsync(undefined, {
      onSuccess: () => {
        queryclient.setQueryData(userQueries.currentUserKey, null);
        localStorage.removeItem(TOKEN_KEY);
      },
    });
  };

  return (
    <>
      <ResponsiveContainer>
        <Flex align="center" justify="space-between" h="100%">
          <Title order={3} c="gray-shop-1">
            по
            <Text span c="green" inherit>
              Ж
            </Text>
            рать
          </Title>
          <Group gap={20} align="center">
            {isAuthorized && (
              <Menu>
                <Menu.Target>
                  <Avatar
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
                  <Menu.Item>
                    <Text onClick={handleLogout}>Выйти</Text>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
            <Link to={routesMap["/basket"]}>
              <IconBasket cursor="pointer" />
            </Link>
            <IconMenu2 onClick={toggle} cursor="pointer" />
          </Group>
        </Flex>
      </ResponsiveContainer>

      <Drawer title="Меню" opened={isOpen} onClose={close} position="right">
        <Sections />
      </Drawer>
    </>
  );
};
