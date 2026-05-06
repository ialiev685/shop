import type { PropsWithChildren } from "react";
import { MantineProvider, mergeThemeOverrides } from "@mantine/core";
import { buttonTheme, inputTheme } from "@/shared/theme";
import { colors } from "@/shared/configs";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

const theme = mergeThemeOverrides(buttonTheme, inputTheme, {
  colors,
  fontSizes: {
    xs: "14px",
    sm: "14px",
    md: "14px",
    lg: "14px",
    xl: "14px",
  },
  breakpoints: {
    xs: "375px", // телефоны
    sm: "576px", // телефоны горизонтально
    md: "768px", // планшеты
    lg: "1024px", // ноутбуки
    xl: "1280px", // десктопы
  },

  fontFamily: "Inter, sans-serif",
  components: {
    InputWrapper: {
      styles: {
        label: {
          marginBottom: "4px",
        },
      },
    },
  },
});

export const UIProvider = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  );
};
