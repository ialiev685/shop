import type { PropsWithChildren } from "react";
import { MantineProvider, mergeThemeOverrides } from "@mantine/core";
import { buttonTheme } from "@/shared/ui";
import { colors, routes } from "@/shared/configs";
import { Notifications } from "@mantine/notifications";
import { useLocation } from "react-router-dom";

const fontOptions = {
  [`/${routes.login}`]: "Inter, sans-serif",
  [`/${routes.products}`]: "Cairo, sans-serif",
};

const getTheme = (path: string) => {
  const theme = mergeThemeOverrides(buttonTheme, {
    colors,
    fontFamily: fontOptions[path],
    lineHeights: {
      xs: "1",
      sm: "1",
      md: "1",
      lg: "1",
      xl: "1",
    },
    components: {
      InputWrapper: {
        styles: {
          label: {
            marginBottom: "8px",
          },
        },
      },
    },
  });

  return theme;
};

export const UIProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const theme = getTheme(location.pathname);

  return (
    <MantineProvider theme={theme}>
      <Notifications />
      {children}
    </MantineProvider>
  );
};
