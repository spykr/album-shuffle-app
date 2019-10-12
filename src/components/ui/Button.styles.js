import styled from "styled-components";

const Button = styled.button`
  align-items: center;
  background-color: ${p => p.backgroundColor || "#222"};
  border: 0;
  border-radius: 999px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  color: ${p => p.color || "white"};
  cursor: pointer;
  display: flex;
  font-size: 20px;
  font-weight: 400;
  justify-content: center;
  line-height: 1;
  padding: 20px 24px;
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

export default {
  Button,
};
