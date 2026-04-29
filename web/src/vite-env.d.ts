/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// import {
//   MantineColorsTuple,
//   DefaultMantineColor,
//   ButtonVariant,
//   InputVariant,
// } from "@mantine/core";
// import { CustomColors } from "@shared/configs";
// import { ButtonCustomVariant } from "@/shared/theme/button";
// import { InputCustomVariant } from "@/shared/theme/input";

type ExtendedButtonVariant = ButtonVariant | ButtonCustomVariant;
type ExtendedInputVariant = InputVariant | InputCustomVariant;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors | DefaultMantineColor, MantineColorsTuple>;
  }
  export interface ButtonProps {
    variant?: ExtendedButtonVariant;
  }
  export interface TextInputProps {
    variant?: ExtendedInputVariant;
  }

  export interface PasswordInputProps {
    variant?: ExtendedInputVariant;
  }
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_NODE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
