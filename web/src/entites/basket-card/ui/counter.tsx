import { Button, Group, Paper, Text } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";

interface CounterProps {
  quantity: number;
}

export const Counter: React.FC<CounterProps> = ({ quantity }) => {
  //   const handleIncrement = () => {};

  //   const handleDecrement = () => {};

  return (
    <Paper radius={4} bg="green-shop-1">
      <Group>
        <Button variant="filled-shop">
          <IconMinus />
        </Button>
        <Text c="white" fz={16}>
          {quantity}
        </Text>
        <Button variant="filled-shop">
          <IconPlus />
        </Button>
      </Group>
    </Paper>
  );
};
