import { useForm } from "@mantine/form";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Stack,
  Text,
  Select,
  Box,
} from "@mantine/core";
import type {
  V1AddProductCreateData,
  V1AddProductCreatePayload,
} from "@/services/data-contracts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { typeQueries } from "../api/type-queries";
import { productQueries } from "../api/product-queries";
import { useState } from "react";

type FormValues = Required<V1AddProductCreatePayload>;
interface AddProductFormProps {
  triggerButton: React.ReactNode;
}

export const AddProductForm = ({ triggerButton }: AddProductFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      price: 0,
      sku: "",
      typeId: 0,
      img: "",
    },
    validate: {
      name: (value) =>
        !value || value.length < 2
          ? "Название должно содержать минимум 2 символа"
          : null,
      price: (value) =>
        isNaN(value) || Number(value) <= 0 ? "Цена должна быть больше 0" : null,
      sku: (value) =>
        !value || value.length < 1 ? "Артикул обязателен" : null,
      typeId: (value) => (!value || value <= 0 ? "Выберите тип товара" : null),
      img: (value) =>
        !value || value.length < 1 ? "URL изображения обязателен" : null,
    },
  });

  const typeListQuery = useQuery(typeQueries.get);
  const queryClient = useQueryClient();
  const productMutation = useMutation(productQueries.add);

  const handleSubmit = form.onSubmit(async (values) => {
    await productMutation.mutateAsync(values, {
      onSuccess: (data) => {
        queryClient.setQueryData(
          productQueries.productListKey(values.typeId),
          (oldData: V1AddProductCreateData[]) => [...oldData, data],
        );
      },
    });
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
            Добавление товара
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

            <TextInput
              radius={8}
              size="md"
              label={<Text c="gray-main-2">Цена</Text>}
              placeholder="Введите цену"
              type="number"
              {...form.getInputProps("price")}
            />

            <TextInput
              radius={8}
              size="md"
              label={<Text c="gray-main-2">Вендор</Text>}
              placeholder="Введите вендора"
              {...form.getInputProps("vendor")}
            />

            <TextInput
              radius={8}
              size="md"
              label={<Text c="gray-main-2">Артикул</Text>}
              placeholder="Введите артикул"
              {...form.getInputProps("sku")}
            />

            <TextInput
              radius={8}
              size="md"
              label={<Text c="gray-main-2">URL изображения</Text>}
              placeholder="Введите URL изображения"
              {...form.getInputProps("img")}
            />

            <Select
              radius={8}
              size="md"
              label={<Text c="gray-main-2">Тип товара</Text>}
              placeholder="Выберите тип"
              data={typeListQuery.data?.map((type) => ({
                value: String(type.id),
                label: type.name,
              }))}
              {...form.getInputProps("typeId")}
            />

            <Group justify="flex-end" mt="md">
              <Button variant="outline-admin" onClick={handleClose}>
                Отмена
              </Button>
              <Button type="submit" loading={productMutation.isPending}>
                Добавить
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
};
