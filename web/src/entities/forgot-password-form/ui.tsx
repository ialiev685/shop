import { routesMap } from "@/shared/routes";
import { TextInput, Button, Paper, Title, Flex, Text } from "@mantine/core";
import { useForm, isEmail } from "@mantine/form";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: isEmail("Неверный формат email"),
    },
  });

  const handleSubmit = (values: typeof form.values) => {};

  return (
    <Paper shadow="md" p={30} mt={30} radius="md">
      <Title ta="center" order={2} c="gray-shop-1">
        Восстановление пароля
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={8}>
        Введите ваш email, и мы отправим ссылку для сброса пароля
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          variant="default-green-shop"
          label="Email"
          placeholder="ваш@email.com"
          required
          mt="md"
          {...form.getInputProps("email")}
        />

        <Button mt={24} fullWidth type="submit" variant="filled-accent-shop">
          Отправить ссылку
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
          >
            Регистрация
          </Button>
        </Flex>
      </form>
    </Paper>
  );
};
