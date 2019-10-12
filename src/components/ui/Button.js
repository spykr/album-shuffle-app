import React from "react";
import Styled from "./Button.styles";

const Button = ({ className, ...rest }) => {
  return <Styled.Button className={className} {...rest} />;
};

export default Button;
