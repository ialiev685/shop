import { routesMap } from "@/app/routes";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Flex,
} from "@mantine/core";
import { useForm, isEmail } from "@mantine/form";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  type: "login" | "register";
  isLoading: boolean;
  onSubmit: (values: FormValues) => Promise<void>;
}

interface FormValues {
  email: string;
  password: string;
  confirmPassword?: string;
}

export const AuthForm = ({ type, onSubmit, isLoading }: AuthFormProps) => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: isEmail("Неверный формат email"),
      password: (value) =>
        value.length < 8 ? "Пароль должен содержать не менее 8 символов" : null,
      confirmPassword: (value, values) => {
        if (type === "login") return null;
        return value !== values.password ? "Пароли не совпадают" : null;
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await onSubmit(values);
    form.reset();
  };

  const isLogin = type === "login";

  return (
    <Paper shadow="md" p={30} mt={30} radius="md">
      <Title ta="center" order={2} c="gray-shop-1">
        {isLogin ? "Вход" : "Регистрация"}
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          variant="default-green-shop"
          label="Email"
          placeholder="ваш@email.com"
          required
          mt="md"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          variant="default-green-shop"
          label="Пароль"
          placeholder="Ваш пароль"
          required
          mt="md"
          {...form.getInputProps("password")}
        />
        {!isLogin && (
          <PasswordInput
            variant="default-green-shop"
            label="Подтверждение пароля"
            placeholder="Подтвердите пароль"
            required
            mt="md"
            {...form.getInputProps("confirmPassword")}
          />
        )}
        <Button
          mt={16}
          fullWidth
          type="submit"
          variant="filled-accent-shop"
          loading={isLoading}
        >
          {isLogin ? " Войти" : "Зарегистрироваться"}
        </Button>
        <Flex gap={16} mt={16}>
          <Button
            size="xs"
            variant="outline-green-shop"
            w="100%"
            fz={12}
            onClick={() => {
              navigate(isLogin ? routesMap["/register"] : routesMap["/login"]);
            }}
            loading={isLoading}
          >
            {isLogin ? "Регистрация" : "Войти"}
          </Button>
          <Button
            size="xs"
            variant="subtle"
            w="100%"
            c="gray-shop-2"
            fz={12}
            onClick={() => {
              navigate(routesMap["/forgot-password"]);
            }}
            loading={isLoading}
          >
            Забыли пароль?
          </Button>
        </Flex>
      </form>
    </Paper>
  );
};
