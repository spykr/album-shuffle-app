import styled from "styled-components";

import { truncate } from "@/utils/styled";
import { Button } from "@/components/ui";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  z-index: 2;
`;

const LoginBanner = styled.div`
  background-color: #1d1d1d;
  color: white;
  display: flex;
  font-size: 13px;
  font-weight: 300;
  line-height: 1;

  @media (max-width: 360px) {
    font-size: 12px;
  }

  i {
    font-size: 12px;
    margin-right: 5px;
  }

  span {
    ${truncate};
    flex-grow: 1;
    padding: 12px;

    @media (max-width: 360px) {
      padding: 12px 8px;
    }
  }
`;

const LoginButton = styled.button`
  background: none;
  background-color: #222;
  border: 0;
  border-left: 1px solid black;
  color: white;
  cursor: pointer;
  flex-shrink: 0;
  font-weight: 400;
  padding: 12px;

  @media (max-width: 360px) {
    padding: 12px 8px;
  }
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
  LoginBanner,
  LoginButton,
  ButtonContainer,
  Button: StyledButton,
};
