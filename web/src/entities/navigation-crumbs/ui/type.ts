import type { LinkProps } from "react-router-dom";

export interface StateLinkProps extends Omit<LinkProps, "state"> {
  title: string;
}

export type LinkState = {
  to: LinkProps["to"];
  title: string;
};

export type StoragePath = Record<string, LinkState>;
