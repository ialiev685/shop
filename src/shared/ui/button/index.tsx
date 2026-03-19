import { createTheme, Button } from "@mantine/core";
import styles from "./styles.module.css";

export const buttonTheme = createTheme({
  components: {
    Button: Button.extend({
      classNames: (_, props) => ({
        root: styles.primary,
      }),
    }),
  },
});
