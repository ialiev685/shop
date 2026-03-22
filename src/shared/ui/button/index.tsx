import { createTheme, Button } from "@mantine/core";
import styles from "./styles.module.css";

export type CustomVariant = "accent-filled-custom" | "outline-custom";

const styleVariant: Record<CustomVariant, string> = {
  "accent-filled-custom": styles["filled"],
  "outline-custom": styles["outline"],
};

export const buttonTheme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        variant: "accent-filled-custom",
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
