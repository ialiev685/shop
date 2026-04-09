import { AuthForm } from "@/entites/auth-form";
import { Center, Container } from "@mantine/core";
import { useController } from "./model";

export const Authorization = () => {
  const { handleSignIn } = useController();
  return (
    <Center bg="gray-auth-7" h="100vh">
      <Container size={527}>
        <AuthForm onSignIn={handleSignIn} />
      </Container>
    </Center>
  );
};
