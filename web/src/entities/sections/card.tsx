import { Box, Flex, Text } from "@mantine/core";
import style from "./styles.module.css";

type CardProps = {
  title?: string;
};

export const Card = ({ title }: CardProps) => {
  return (
    <Box h={140} className={style["card"]} bdrs={4}>
      <Flex align="flex-end" flex="max-content" h="100%" p={12}>
        <Text fw={700} c="white" fz={18}>
          {title}
        </Text>
      </Flex>
    </Box>
  );
};
