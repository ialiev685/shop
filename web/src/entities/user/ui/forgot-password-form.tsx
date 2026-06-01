import { routesMap } from "@/app/routes";
import { TextInput, Button, Paper, Title, Flex, Text } from "@mantine/core";
import { useForm, isEmail } from "@mantine/form";
import { useNavigate } from "react-router-dom";

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => Promise<void>;
  isLoading: boolean;
}

export const ForgotPasswordForm = ({
  onSubmit,
  isLoading,
}: ForgotPasswordFormProps) => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: isEmail("Неверный формат email"),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await onSubmit(values.email);
    form.reset();
  };

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

        <Button
          mt={24}
          fullWidth
          type="submit"
          variant="filled-accent-shop"
          loading={isLoading}
        >
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
