import { Form } from "@/entites/form";
import { Center, Container } from "@mantine/core";

export const Authorization = () => {
  return (
    <Center bg="gray-auth-7" h="100vh">
      <Container size={527}>
        <Form />
      </Container>
    </Center>
  );
};
