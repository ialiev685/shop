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
  V1AddProductCreatePayload,
  V1UploadFileCreatePayload,
} from "@/services/data-contracts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


import { useState } from "react";
import { UploadFile } from "@/shared/ui/upload-file";
import { uploadFile } from "@/services/requests/files";
import { typeQueries } from "@/entities/catalog";
import { productQueries } from "@/entities/product";

type FormValues = Required<
  V1AddProductCreatePayload & { files: File[] | null }
>;
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
      files: null,
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
      files: (value) =>
        !value || value.length < 1 ? "Загрузите изображение" : null,
    },
  });

  const hasTypeId = Boolean(form.getValues().typeId);

  const typeListQuery = useQuery(typeQueries.get({}));
  const queryClient = useQueryClient();
  const productMutation = useMutation(productQueries.add);

  const handleSubmit = form.onSubmit(async (values) => {
    const { files, ...otherValues } = values;
    if (!files || files.length < 1) return;
    const formData = new FormData();
    formData.set("file", files[0]);

    uploadFile(formData as unknown as V1UploadFileCreatePayload).then(
      async ({ url }) => {
        await productMutation.mutateAsync(
          {
            ...otherValues,
            img: `${import.meta.env.VITE_APP_API_URL}/${url}`,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: productQueries.primaryKey,
              });
            },
          },
        );
        handleClose();
      },
    );
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
            Добавление продукта
          </Text>
        }
        centered
      >
        <form onSubmit={handleSubmit}>
          <Stack gap={12}>
            <Select
              clearable
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

            <TextInput
              disabled={!hasTypeId}
              radius={8}
              size="md"
              label={<Text c="gray-main-2">Наименование</Text>}
              placeholder="Введите наименование товара"
              {...form.getInputProps("name")}
            />

            <TextInput
              disabled={!hasTypeId}
              radius={8}
              size="md"
              label={<Text c="gray-main-2">Цена</Text>}
              placeholder="Введите цену"
              type="number"
              {...form.getInputProps("price")}
            />

            <TextInput
              disabled={!hasTypeId}
              radius={8}
              size="md"
              label={<Text c="gray-main-2">Артикул</Text>}
              placeholder="Введите артикул"
              {...form.getInputProps("sku")}
            />

            <UploadFile
              title="Загрузите изображение"
              accept={["jpeg", "png"]}
              {...form.getInputProps("files")}
              files={form.getInputProps("files").value}
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
