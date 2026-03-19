import { createTheme, TextInput } from "@mantine/core";
import styles from "./styles.module.css";

export const textInputTheme = createTheme({
  components: {
    TextInput: TextInput.extend({
      classNames: (_, props) => ({
        // root: styles.primary,
      }),
    }),
  },
});
