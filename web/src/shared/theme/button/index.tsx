import { createTheme, Button } from "@mantine/core";
import styles from "./styles.module.css";

export type ButtonCustomVariant =
  | "accent-filled-admin"
  | "outline-admin"
  | "outline-green-shop"
  | "filled-green-shop"
  | "outline-accent-shop"
  | "filled-accent-shop";

const styleVariant: Record<ButtonCustomVariant, string> = {
  "accent-filled-admin": styles["filled-admin"],
  "outline-admin": styles["outline-admin"],
  "outline-green-shop": styles["outline-green-shop"],
  "filled-green-shop": styles["filled-green-shop"],
  "outline-accent-shop": styles["outline-accent-shop"],
  "filled-accent-shop": styles["filled-accent-shop"],
};

export const buttonTheme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        variant: "accent-filled-admin",
      },
      classNames: (_, props) => ({
        root:
          props.variant && props.variant in styleVariant
            ? styleVariant[props.variant as keyof typeof styleVariant]
            : undefined,
      }),
    }),
  },
});
