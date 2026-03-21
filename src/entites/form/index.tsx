import {
  Button,
  Title,
  Text,
  Flex,
  TextInput,
  Group,
  PasswordInput,
  Checkbox,
  Divider,
} from "@mantine/core";
import styles from "./styles.module.css";
import { IconX, IconUser, IconLock } from "@tabler/icons-react";
import { Logo } from "./logo";
import { useForm, isNotEmpty } from "@mantine/form";
import type { LoginData } from "@/services/client";

interface FormProps {
  onSignIn: (options: LoginData) => void;
}

const ERROR_TEXT = "Поле не должно быть пустым";

export const Form = ({ onSignIn }: FormProps) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
      shouldRemember: false,
    },
    validate: {
      username: isNotEmpty(ERROR_TEXT),
      password: isNotEmpty(ERROR_TEXT),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSignIn(values))}>
      <div className={styles["wrapper-form"]}>
        <div className={styles["box-from"]}>
          <Logo />
          <Flex direction="column" gap={12} align="center" mt={32}>
            <Title className="text-center" fw={600} size={40} c="gray-auth-1">
              Добро пожаловать!
            </Title>
            <Text c="gray-auth-5">Пожалуйста, авторизируйтесь</Text>
          </Flex>
          <Flex direction="column" w="100%" gap={16}>
            <TextInput
              key={form.key("username")}
              leftSection={<IconUser />}
              label="Логин"
              w="100%"
              rightSection={<IconX cursor="pointer" />}
              radius={12}
              size="xl"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              key={form.key("password")}
              leftSection={<IconLock />}
              label="Пароль"
              w="100%"
              size="xl"
              radius={12}
              {...form.getInputProps("password")}
            />
          </Flex>
          <Flex direction="column" gap={20} mt={20}>
            <Checkbox
              key={form.key("shouldRemember")}
              style={{ cursor: "pointer" }}
              size="md"
              c="gray-auth-4"
              label={
                <Text fz={16} fw={500}>
                  Запомнить данные
                </Text>
              }
              color="purple-auth"
              {...form.getInputProps("shouldRemember")}
            />
            <Button type="submit" size="xl" className="bg-red" fz={18} h={55}>
              Войти
            </Button>
          </Flex>

          <Flex gap={31} direction="column" mt={16}>
            <Divider
              label={
                <Text fw={500} fz={16}>
                  или
                </Text>
              }
            />
            <Group gap={4} justify="center">
              <Text fz={18} c="gray-auth-2">
                Нет аккаунта?
              </Text>
              <Text fw={600} c="purple-auth">
                Создать
              </Text>
            </Group>
          </Flex>
        </div>
      </div>
    </form>
  );
};
