import { useForm } from "@mantine/form";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Stack,
  Text,
  Box,
} from "@mantine/core";
import type {
  V1AddNameTypeCreatePayload,
  V1TypeListListData,
} from "@/services/data-contracts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useState, type ReactNode } from "react";
import { typeQueries } from "@/entities/catalog";

type FormValues = Required<V1AddNameTypeCreatePayload>;
interface AddProductFormProps {
  triggerButton: ReactNode;
}

export const AddTypeForm = ({ triggerButton }: AddProductFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<FormValues>({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) =>
        !value || value.length < 2
          ? "Название должно содержать минимум 2 символа"
          : null,
    },
  });
  const queryClient = useQueryClient();

  const typeMutation = useMutation(typeQueries.add);
  const handleSubmit = form.onSubmit(async ({ name }) => {
    await typeMutation.mutateAsync(
      { name },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(
            typeQueries.typeListKey(),
            (oldData: V1TypeListListData) => [...oldData, data],
          );
        },
      },
    );
    form.reset();
    setIsOpen(false);
  });

  const handleClose = () => {
    form.reset();
    setIsOpen(false);
  };

  return (
    <>
      <Box component="span" onClick={() => setIsOpen(true)}>
        {triggerButton}
      </Box>
      <Modal
        opened={isOpen}
        onClose={handleClose}
        title={
          <Text fw="bold" c="gray-main-1" size="lg">
            Добавление типа
          </Text>
        }
        centered
      >
        <form onSubmit={handleSubmit}>
          <Stack gap={12}>
            <TextInput
              radius={8}
              size="md"
              label={<Text c="gray-main-2">Наименование</Text>}
              placeholder="Введите наименование товара"
              {...form.getInputProps("name")}
            />

            <Group justify="flex-end" mt="md">
              <Button variant="outline-admin" onClick={handleClose}>
                Отмена
              </Button>
              <Button type="submit" loading={typeMutation.isPending}>
                Добавить
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
};
