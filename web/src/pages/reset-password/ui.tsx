import { routesMap } from "@/shared/routes";
import { PasswordInput, Button, Paper, Title, Flex, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) =>
        value.length < 8 ? "Пароль должен содержать не менее 8 символов" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Пароли не совпадают" : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    notifications.show({
      title: "Пароль изменён",
      message: "Ваш пароль успешно обновлён. Теперь вы можете войти.",
      color: "green",
    });

    // Перенаправляем на страницу входа
    setTimeout(() => {
      navigate(routesMap["/login"]);
    }, 2000);
  };

  return (
    <Paper shadow="md" p={30} mt={30} radius="md">
      <Title ta="center" order={2} c="gray-shop-1">
        Создание нового пароля
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={8}>
        Придумайте новый надёжный пароль
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <PasswordInput
          variant="default-green-shop"
          label="Новый пароль"
          placeholder="Введите новый пароль"
          required
          mt="md"
          {...form.getInputProps("password")}
        />

        <PasswordInput
          variant="default-green-shop"
          label="Подтверждение пароля"
          placeholder="Подтвердите новый пароль"
          required
          mt="md"
          {...form.getInputProps("confirmPassword")}
        />

        <Button mt={24} fullWidth type="submit" variant="filled-accent-shop">
          Сохранить пароль
        </Button>

        <Flex gap={16} mt={16}>
          <Button
            size="xs"
            variant="outline-green-shop"
            w="100%"
            fz={12}
            onClick={() => {
              navigate(routesMap["/login"]);
            }}
          >
            Вернуться ко входу
          </Button>
          <Button
            size="xs"
            variant="subtle"
            w="100%"
            c="gray-shop-2"
            fz={12}
            onClick={() => {
              navigate(routesMap["/register"]);
            }}
          >
            Создать аккаунт
          </Button>
        </Flex>
      </form>
    </Paper>
  );
};
