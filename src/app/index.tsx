import { MantineProvider, mergeThemeOverrides } from "@mantine/core";
import { buttonTheme } from "@/shared/ui";
import { colors } from "@/shared/configs";
import { AuthProvider } from "./providers/auth";
import { QueryProvider } from "./providers/query";
import { Notifications } from "@mantine/notifications";
import { Router } from "./providers/router";

const theme = mergeThemeOverrides(buttonTheme, { colors });

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <QueryProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </QueryProvider>
    </MantineProvider>
  );
};

export default App;
