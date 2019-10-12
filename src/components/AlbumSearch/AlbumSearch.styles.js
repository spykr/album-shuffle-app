import styled from "styled-components";

const AlbumSearch = styled.div`
  flex-shrink: 0;
  position: relative;
  z-index: 2;
`;

const InputClearButton = styled.button`
  align-items: center;
  background: none;
  border: 0;
  color: white;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: calc(32px + 16px);

  i {
    font-size: 16px;
  }
`;

const Input = styled.input`
  background-color: black;
  border: 0;
  box-sizing: border-box;
  color: white;
  font-size: 20px;
  padding: 16px;
  ${p => p.typing && `padding-right: calc(32px + 16px)`};
  width: 100%;

  @media (max-width: 370px) {
    font-size: 17px;
  }

  &::placeholder {
    font-weight: 300;
  }
`;

export default {
  AlbumSearch,
  InputClearButton,
  Input,
};
