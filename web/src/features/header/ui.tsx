import { Sections } from "@/entites/sections";
import { ResponsiveContainer } from "@/shared/ui/responsive-container";
import { AppShell, Flex, Drawer, Title, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu2, IconBasket } from "@tabler/icons-react";

export const Header = () => {
  const [isOpen, { close, toggle }] = useDisclosure(false);

  return (
    <AppShell.Header h={56}>
      <ResponsiveContainer>
        <Flex align="center" justify="space-between" h="100%">
          <Title order={3} c="gray-shop-1">
            поЖрать
          </Title>
          <Group gap={20}>
            <IconBasket />
            <IconMenu2 onClick={toggle} cursor="pointer" />
          </Group>
        </Flex>
      </ResponsiveContainer>

      <Drawer title="Меню" opened={isOpen} onClose={close} position="right">
        <Sections />
      </Drawer>
    </AppShell.Header>
  );
};
