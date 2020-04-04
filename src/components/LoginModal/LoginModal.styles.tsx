import styled, { css } from "styled-components";

const Modal = styled.div<{
  open: boolean;
}>`
  background-color: rgba(0, 0, 0, 0.6);
  bottom: 0;
  display: flex;
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  transition: opacity 0.3s;
  z-index: 99;

  ${(p) =>
    p.open &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}
`;

const Dialog = styled.div`
  background-color: #222;
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
  width: 100%;
`;

const Header = styled.div`
  background-color: #1d1d1d;
  color: white;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 700;
  margin: 16px;
`;

const CloseButton = styled.button`
  background: none;
  border: 0;
  color: white;
  cursor: pointer;
  font-size: 18px;
  padding: 0 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 32px;
`;

const Description = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  margin: 0;
  text-align: center;
`;

const InputContainer = styled.div`
  align-items: center;
  color: white;
  display: flex;
  margin-top: 32px;
`;

const InputIcon = styled.i`
  flex-shrink: 0;
  font-size: 18px;
  margin-right: 16px;
`;

const Input = styled.input`
  background: none;
  border: 0;
  border-bottom: 2px solid #1d1d1d;
  color: white;
  flex-grow: 1;
  height: 40px;
`;

const SubmitButton = styled.button`
  background-color: #1d1d1d;
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: white;
  cursor: pointer;
  height: 50px;
  margin-top: 32px;
`;

const LoaderContainer = styled.div`
  height: 100px;
  position: relative;
`;

export default {
  Modal,
  Dialog,
  Header,
  Title,
  CloseButton,
  Form,
  Description,
  LoaderContainer,
  InputContainer,
  Input,
  InputIcon,
  SubmitButton,
};
