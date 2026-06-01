import { Link } from "react-router-dom";
import type { LinkState, StateLinkProps } from "./type";

export const LinkWithState = ({
  to,
  children,
  title,
  ...props
}: StateLinkProps) => {
  const state: LinkState = {
    to,
    title,
  };

  return (
    <Link to={to} {...props} state={state}>
      {children}
    </Link>
  );
};
