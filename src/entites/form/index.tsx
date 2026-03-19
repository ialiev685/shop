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

export const Form = () => {
  return (
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
            leftSection={<IconUser />}
            label="Логин"
            w="100%"
            rightSection={<IconX cursor="pointer" />}
            radius={12}
            size="xl"
          />
          <PasswordInput
            leftSection={<IconLock />}
            label="Пароль"
            w="100%"
            size="xl"
            radius={12}
          />
        </Flex>
        <Flex direction="column" gap={20} mt={20}>
          <Checkbox
            style={{ cursor: "pointer" }}
            size="md"
            c="gray-auth-4"
            label={
              <Text fz={16} fw={500}>
                Запомнить данные
              </Text>
            }
            color="purple-auth"
          />
          <Button size="xl" className="bg-red" fz={18} h={55}>
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
            <Text fw={600} c="purple-auth" style={{ cursor: "pointer" }}>
              Создать
            </Text>
          </Group>
        </Flex>
      </div>
    </div>
  );
};
