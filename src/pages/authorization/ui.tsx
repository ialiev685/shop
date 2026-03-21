import { Form } from "@/entites/form";
import { Center, Container } from "@mantine/core";
import { useController } from "./model";

export const Authorization = () => {
  const { handleSignIn } = useController();
  return (
    <Center bg="gray-auth-7" h="100vh">
      <Container size={527}>
        <Form onSignIn={handleSignIn} />
      </Container>
    </Center>
  );
};
