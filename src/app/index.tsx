import { MantineProvider, mergeThemeOverrides } from "@mantine/core";
import { buttonTheme, textInputTheme } from "@/shared/ui";
import { colors } from "@/shared/configs";
import { Authorization } from "../page/authorization";
import { AuthProvider } from "./providers/auth";
import { QueryProvider } from "./providers/query";
import { Notifications } from "@mantine/notifications";

const theme = mergeThemeOverrides(buttonTheme, textInputTheme, { colors });

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <QueryProvider>
        <AuthProvider>
          <Authorization />
        </AuthProvider>
      </QueryProvider>
    </MantineProvider>
  );
};

export default App;
