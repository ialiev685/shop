import {
  Box,
  Flex,
  Title,
  TextInput,
  useMantineTheme,
  Button,
  Group,
} from "@mantine/core";
import { IconRefresh, IconSearch, IconCirclePlus } from "@tabler/icons-react";
import { useController } from "../models";
import { ProductsTable } from "@/entites/products-table";
import { Pagination } from "@/entites/pagination";

export const Products = () => {
  const theme = useMantineTheme();

  const { data } = useController();
  console.log("data", data);
  return (
    <>
      <Flex p="26px 30px" bg="#FFF" justify="space-between" align="center">
        <Title fw="bold" order={3} w={100} c="gray-main-1">
          Товары
        </Title>
        <TextInput
          w={1000}
          placeholder="Найти"
          leftSection={<IconSearch />}
          radius={8}
          styles={{
            input: {
              border: "none",
              backgroundColor: theme.colors["gray-main-5"][0],
              height: 48,
              paddingLeft: 48,
            },
            section: {
              marginLeft: 10,
            },
          }}
        />
        <Box w={100} />
      </Flex>
      <Box p="44px 30px" mt={30} bg="#FFF">
        <Flex justify="space-between" align="center">
          <Title fw="bold" order={4} c="gray-main-1">
            Все позиции
          </Title>
          <Group gap={8}>
            <Button variant="outline-custom" radius={8}>
              <IconRefresh color={theme.colors["gray-auth-3"][0]} />
            </Button>
            <Button
              radius={6}
              leftSection={<IconCirclePlus size={22} />}
              fw="normal"
            >
              Добавить
            </Button>
          </Group>
        </Flex>
        <Flex mt={40} gap={50} direction="column">
          <ProductsTable data={data?.products} />
          <Pagination totalItems={data?.total ?? 0} />
        </Flex>
      </Box>
    </>
  );
};
