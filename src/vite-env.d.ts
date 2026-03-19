/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import { MantineColorsTuple, DefaultMantineColor } from "@mantine/core";
import { CustomColors } from "@shared/configs";

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors | DefaultMantineColor, MantineColorsTuple>;
  }
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
