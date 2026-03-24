import { useForm } from "@mantine/form";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";

interface AddProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onSubmit: () => {};
}

export const AddProductForm = ({ isOpen, onClose }: AddProductFormProps) => {
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      title: "",
      price: "",
      vendor: "",
      sku: "",
    },
    validate: {
      title: (value) =>
        value.length < 2 ? "Название должно содержать минимум 2 символа" : null,
      price: (value) =>
        Number(value) <= 0 ? "Цена должна быть больше 0" : null,
      vendor: (value) =>
        value.length < 2 ? "Вендор должен содержать минимум 2 символа" : null,
      sku: (value) => (value.length < 1 ? "Артикул обязателен" : null),
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    console.log("values", values);
    form.reset();
    onClose();
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
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
            {...form.getInputProps("title")}
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

          <Group justify="flex-end" mt="md">
            <Button variant="outline-custom" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit">Добавить</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
