import styled from "styled-components";

import { Button } from "@/components/ui";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  z-index: 2;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-shrink: 0;
`;

const StyledButton = styled(Button)`
  border-radius: 0;
  font-size: 14px;
  padding: 24px 16px;
  width: 50%;

  @media (max-width: 330px) {
    font-size: 13px;
    padding: 16px;
  }

  @media (min-width: 360px) {
    font-size: 16px;
  }

  &:first-child {
    border-right: 1px solid black;
  }
`;

export default {
  Header,
  ButtonContainer,
  Button: StyledButton,
};
