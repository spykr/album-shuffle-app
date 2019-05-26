import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  align-items: center;
  background-color: ${p => p.backgroundColor || "#222"};
  border: 0;
  border-radius: 999px;
  color: ${p => p.color || "white"};
  cursor: pointer;
  display: flex;
  font-size: 20px;
  font-weight: 300;
  justify-content: center;
  line-height: 1;
  padding: 16px 24px;
  min-width: 100px;
  text-decoration: none;

  @media (min-width: 500px) {
    font-size: 24px;
    padding: 24px 32px;
  }

  i {
    margin-right: 8px;
  }
`;

const Button = ({ className, ...rest }) => {
  return <StyledButton className={className} {...rest} />;
};

export default Button;
