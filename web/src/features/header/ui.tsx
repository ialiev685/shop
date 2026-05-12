import { Sections } from "@/entities/sections";
import { routesMap } from "@/app/routes";

import { ResponsiveContainer } from "@/shared/ui/responsive-container";
import {
  Flex,
  Drawer,
  Title,
  Group,
  Menu,
  Avatar,
  Button,
  Anchor,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu2, IconBasket } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { Text } from "@mantine/core";
import { useAuth } from "@/app/providers/auth/context";
import { useQuery } from "@tanstack/react-query";
import { typeQueries } from "@/entities/catalog";

export const Header = () => {
  const [isOpen, { close, toggle }] = useDisclosure(false);
  const { isAuthorized, user, logout } = useAuth();

  const navigate = useNavigate();
  const { data = [], isLoading } = useQuery(typeQueries.get({}));

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
            {isAuthorized ? (
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
                        to={routesMap["/admin"]}
                        underline="never"
                      >
                        Администрирование
                      </Anchor>
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    <Text onClick={logout}>Выйти</Text>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Button
                size="xs"
                variant="filled-green-shop"
                onClick={() => navigate(routesMap["/login"])}
              >
                Войти
              </Button>
            )}
            <Link to={routesMap["/basket"]}>
              <IconBasket cursor="pointer" />
            </Link>
            <IconMenu2 onClick={toggle} cursor="pointer" />
          </Group>
        </Flex>
      </ResponsiveContainer>

      <Drawer title="Меню" opened={isOpen} onClose={close} position="right">
        <Sections data={data} isLoading={isLoading} />
      </Drawer>
    </>
  );
};
