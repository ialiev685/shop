import { createTheme, Button } from "@mantine/core";
import styles from "./styles.module.css";

export type CustomVariant =
  | "accent-filled-admin"
  | "outline-admin"
  | "outline-shop";

const styleVariant: Record<CustomVariant, string> = {
  "accent-filled-admin": styles["filled-admin"],
  "outline-admin": styles["outline-admin"],
  "outline-shop": styles["outline-shop"],
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
