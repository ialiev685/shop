import {
  Box,
  Flex,
  Title,
  useMantineTheme,
  Button,
  Group,
} from "@mantine/core";
import { IconRefresh, IconCirclePlus } from "@tabler/icons-react";
import { useController } from "../model";
import { SearchInput } from "./search-input";
import { AddProductForm } from "@/entities/admin/ui/add-product-form";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs } from "./tabs";

export const AdminDashboard = () => {
  const theme = useMantineTheme();
  const { data, isLoading, onAdd } = useController();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  return (
    <>
      <Flex p="26px 30px" bg="#FFF" justify="space-between" align="center">
        <Title fw="bold" order={3} w={100} c="gray-main-1">
          Товары
        </Title>
        <SearchInput />
        <Box w={100} />
      </Flex>

      <Box p="44px 30px" mt={30} bg="#FFF">
        <Title fw="bold" order={4} c="gray-main-1">
          Все позиции
        </Title>

        <Box mt={24}>
          <Tabs />
        </Box>
      </Box>
    </>
  );
};
