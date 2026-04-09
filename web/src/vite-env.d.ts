/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import {
  MantineColorsTuple,
  DefaultMantineColor,
  ButtonVariant,
} from "@mantine/core";
import { CustomColors } from "@shared/configs";
import { CustomVariant } from "@shared/ui/button";

type ExtendedButtonVariant = ButtonVariant | CustomVariant;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors | DefaultMantineColor, MantineColorsTuple>;
  }
  export interface ButtonProps {
    variant?: ExtendedButtonVariant;
  }
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

type ExtendedButtonVariant = ButtonVariant | "contrast" | "radial-gradient";
