import { routesMap } from "@/app/routes";
import { PasswordInput, Button, Paper, Title, Flex, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";

interface ResetPasswordFormProps {
  onSubmit: (params: FormValues & { uuid: string }) => Promise<void>;
  isLoading: boolean;
}

type FormValues = {
  password: string;
  confirmPassword: string;
};

export const ResetPasswordForm = ({
  onSubmit,
  isLoading,
}: ResetPasswordFormProps) => {
  const navigate = useNavigate();
  const { token } = useParams();

  const form = useForm<FormValues>({
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

  const handleSubmit = async (values: typeof form.values) => {
    if (!token) {
      notifications.show({
        title: "Неверная ссылка",
        message: "Попробуйте запросить восстановление пароля заново",
        color: "red",
        position: "top-center",
      });
      return;
    }
    await onSubmit({ ...values, uuid: token });
    form.reset();
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

        <Button
          mt={24}
          fullWidth
          type="submit"
          variant="filled-accent-shop"
          loading={isLoading}
        >
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
            loading={isLoading}
          >
            Войти
          </Button>
          <Button
            size="xs"
            variant="outline-green-shop"
            w="100%"
            fz={12}
            onClick={() => {
              navigate(routesMap["/register"]);
            }}
            loading={isLoading}
          >
            Регистрация
          </Button>
        </Flex>
      </form>
    </Paper>
  );
};
