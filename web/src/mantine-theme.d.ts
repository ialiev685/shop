import type {
  MantineColorsTuple,
  DefaultMantineColor,
  ButtonVariant,
  InputVariant,
} from "@mantine/core";
import type { CustomColors } from "@shared/configs";
import type { ButtonCustomVariant } from "@/shared/theme/button";
import type { InputCustomVariant } from "@/shared/theme/input";

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
