import { ResponsiveContainer } from "@/shared/ui/responsive-container";
import {
  AppShell,
  Burger,
  Flex,
  Drawer,
  Box,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const productTypes = [
  { id: "dairy", name: "Молочные продукты" },
  { id: "meat", name: "Мясо" },
  { id: "vegetables", name: "Овощи" },
  { id: "fruits", name: "Фрукты" },
  { id: "bakery", name: "Хлеб и выпечка" },
  { id: "beverages", name: "Напитки" },
  { id: "eggs", name: "Яйца" },
  { id: "cheese", name: "Сыры" },
];

export const Header = () => {
  const [isOpen, { close, toggle }] = useDisclosure(false);

  return (
    <AppShell.Header h={56}>
      <ResponsiveContainer>
        <Flex align="center" justify="space-between" h="100%">
          <Title order={3}>поЖрать</Title>
          <Burger onClick={toggle} hiddenFrom="sm" />
        </Flex>
      </ResponsiveContainer>

      <Drawer title="Меню" opened={isOpen} onClose={close} position="right">
        <SimpleGrid pt={12} cols={3} spacing={12} verticalSpacing={12}>
          {productTypes.map(({ id, name }) => (
            <Box
              h={90}
              bdrs={12}
              bg="gray-shop-1"
              key={id}
              style={{ cursor: "pointer" }}
            >
              <Flex h="100%" align="center">
                <Text ta="center" w="100%">
                  {name}
                </Text>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Drawer>
    </AppShell.Header>
  );
};
