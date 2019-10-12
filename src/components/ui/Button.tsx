import React from "react";

import Styled from "./Button.styles";

type Props = {
  as?: any;
  backgroundColor?: string;
  children: React.ReactNode;
  color?: string;
  className?: string | undefined;
  disabled?: boolean;
  href?: string;
  onClick?(): void;
  target?: string;
};

const Button = ({ className, ...rest }: Props) => {
  return <Styled.Button className={className} {...rest} />;
};

export default Button;
