import styled, { keyframes } from "styled-components";

const animation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  align-items: center;
  background-color: ${p => p.backgroundColor || "rgba(0, 0, 0, 0.75)"};
  box-sizing: border-box;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  padding: 8px;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Loader = styled.div`
  color: white;
  display: inline-block;
  height: 48px;
  max-height: 100%;
  max-width: 100%;
  width: 48px;

  &:after {
    animation: ${animation} 1.2s linear infinite;
    border: ${p => p.borderWidth}px solid white;
    border-color: white transparent white transparent;
    border-radius: 50%;
    box-sizing: border-box;
    content: "";
    display: block;
    height: 100%;
    width: 100%;
  }
`;

export default {
  Container,
  Loader,
};
