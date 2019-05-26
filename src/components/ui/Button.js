import React from "react";
import styled from "styled-components";

const StyledButton = styled(({ component, ...props }) =>
  React.cloneElement(component, props),
)`
  background-color: #222;
  border: 1px solid white;
  border-radius: 999px;
  color: white;
  cursor: pointer;
  padding: 12px 24px;
  width: 100px;
`;

const Button = ({ as: Component = "button", type, ...rest }) => {
  return <StyledButton component={<Component />} {...rest} />;
};

export default Button;
