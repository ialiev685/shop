import { MantineProvider, mergeThemeOverrides } from "@mantine/core";
import { buttonTheme } from "@/shared/ui";
import { colors } from "@/shared/configs";
import { AuthProvider } from "./providers/auth";
import { QueryProvider } from "./providers/query";
import { Notifications } from "@mantine/notifications";
import { Router } from "./providers/router";

const theme = mergeThemeOverrides(buttonTheme, {
  colors,
  // fontFamily: "Inter, sans-serif",
  fontFamily: "Cairo, sans-serif",
  lineHeights: {
    xs: "1",
    sm: "1",
    md: "1",
    lg: "1",
    xl: "1",
  },
});

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
