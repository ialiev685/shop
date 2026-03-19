/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import { MantineColorsTuple } from "@mantine/core";
import { CustomColors } from "@shared/configs";

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors, MantineColorsTuple>;
  }
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
