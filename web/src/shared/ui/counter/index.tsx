import { Button, Group, Paper, Text } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import type { MouseEventHandler } from "react";

interface CounterProps {
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
}

export const Counter: React.FC<CounterProps> = ({
  quantity,
  onUpdateQuantity,
}) => {
  console.log("пришло", quantity);
  const handleIncrement: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (quantity < 999) {
      onUpdateQuantity(quantity + 1);
    }
  };
  const handleDecrement: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (quantity > 1) {
      onUpdateQuantity(Math.max(0, quantity - 1));
    }
  };

  return (
    <Paper bg="green-shop-1" withBorder={false}>
      <Group preventGrowOverflow={false} grow wrap="nowrap" gap={0}>
        <Button
          radius={4}
          variant="filled-green-shop"
          onClick={handleDecrement}
        >
          <IconMinus />
        </Button>
        <Text c="white" fz={16} ta="center" pl={12} pr={12}>
          {quantity}
        </Text>
        <Button
          variant="filled-green-shop"
          onClick={handleIncrement}
          radius={4}
        >
          <IconPlus />
        </Button>
      </Group>
    </Paper>
  );
};
