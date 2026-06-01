import { createTheme, PasswordInput, TextInput } from "@mantine/core";
import styles from "./styles.module.css";

export type InputCustomVariant = "default-green-shop";

const styleVariant: Record<
  InputCustomVariant,
  { input: string; label: string }
> = {
  "default-green-shop": {
    input: styles["input-green-shop"],
    label: styles["label-green-shop"],
  },
};

export const inputTheme = createTheme({
  components: {
    TextInput: TextInput.extend({
      classNames: (_, props) => {
        const variant = props.variant as InputCustomVariant;
        const stylesConfig =
          variant && variant in styleVariant
            ? styleVariant[variant]
            : undefined;
        return {
          input: stylesConfig?.input,
          label: stylesConfig?.label,
        };
      },
    }),

    PasswordInput: PasswordInput.extend({
      classNames: (_, props) => {
        const variant = props.variant as InputCustomVariant;
        const stylesConfig =
          variant && variant in styleVariant
            ? styleVariant[variant]
            : undefined;
        return {
          input: stylesConfig?.input,
          label: stylesConfig?.label,
        };
      },
    }),
  },
});
