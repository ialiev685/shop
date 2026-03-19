import { MantineProvider, mergeThemeOverrides } from "@mantine/core";
import { buttonTheme, textInputTheme } from "@/shared/ui";
import { colors } from "@/shared/configs";
import { Authorization } from "./page/authorization";

const theme = mergeThemeOverrides(buttonTheme, textInputTheme, { colors });

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <Authorization />
    </MantineProvider>
  );
};

export default App;
