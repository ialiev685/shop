import { Sections } from "@/entites/sections";
import { routesMap } from "@/shared/routes";

import { ResponsiveContainer } from "@/shared/ui/responsive-container";
import { Flex, Drawer, Title, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu2, IconBasket } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isOpen, { close, toggle }] = useDisclosure(false);

  return (
    <>
      <ResponsiveContainer>
        <Flex align="center" justify="space-between" h="100%">
          <Title order={3} c="gray-shop-1">
            поЖрать
          </Title>
          <Group gap={20} align="center">
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
