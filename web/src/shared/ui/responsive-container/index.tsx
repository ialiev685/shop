import { Box, useMantineTheme } from "@mantine/core";
import type { PropsWithChildren } from "react";

export const ResponsiveContainer = ({ children }: PropsWithChildren) => {
  const theme = useMantineTheme();

  console.log("heme.breakpoints", theme.breakpoints.sm);

  return (
    <Box
      m="0 auto"
      h="100%"
      p="14px 12px"
      w={{ xs: theme.breakpoints.xs, md: theme.breakpoints.md }}
    >
      {children}
    </Box>
  );
};
