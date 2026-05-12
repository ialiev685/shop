import { useForm } from "@mantine/form";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Stack,
  Text,
  Box,
  Select,
} from "@mantine/core";
import type { V1AddProductInfoCreatePayload } from "@/services/data-contracts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { productInfoQueries } from "@/entities/product-info/api/product-info-queries";
import { productQueries } from "@/entities/product";
import { useDebouncedCallback } from "@mantine/hooks";

type FormValues = V1AddProductInfoCreatePayload;
interface AddProductInfoFormProps {
  triggerButton: React.ReactNode;
}

export const AddProductInfoForm = ({
  triggerButton,
}: AddProductInfoFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const queryClient = useQueryClient();

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 250);

  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      description: "",
      productId: NaN,
    },
    validate: {
      name: (value) =>
        !value || value.length < 2
          ? "Название должно содержать минимум 2 символа"
          : null,
      description: (value) =>
        !value || value.length < 2
          ? "Описание должно содержать минимум 10 символа"
          : null,
      productId: (value) =>
        !value || isNaN(value) ? "Не выбран продукт" : null,
    },
  });

  const productMutation = useMutation(productInfoQueries.add);
  const productQuery = useQuery(productQueries.getAll({}));
  const hasProductId = Boolean(form.getValues().productId);

  const handleSubmit = form.onSubmit(async (values) => {
    console.log("values", values);
    const { name, description, productId } = values;
    await productMutation.mutateAsync(
      { name, description, productId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: productInfoQueries.primaryKey,
          });
          handleClose();
        },
      },
    );
  });

  const handleClose = () => {
    form.reset();
    setIsOpen(false);
  };
  const { value, ...otherSelectProps } = form.getInputProps("productId");
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
            Добавление описания для продукта
          </Text>
        }
        centered
      >
        <form onSubmit={handleSubmit}>
          <Stack gap={12}>
            <Select
              clearable
              searchValue={search}
              onSearchChange={debouncedSearch}
              radius={8}
              size="md"
              label={<Text c="gray-main-2">Продукт</Text>}
              placeholder="Выберите продукт"
              data={productQuery.data?.data.map((product) => ({
                value: String(product.id),
                label: product.name,
              }))}
              {...otherSelectProps}
              value={value ? value : null}
            />

            <TextInput
              disabled={!hasProductId}
              radius={8}
              size="md"
              label={<Text c="gray-main-2">Наименование</Text>}
              placeholder="Введите наименование характеристики"
              {...form.getInputProps("name")}
            />

            <TextInput
              disabled={!hasProductId}
              radius={8}
              size="md"
              label={<Text c="gray-main-2">Описание</Text>}
              placeholder="Введите описание"
              {...form.getInputProps("description")}
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
