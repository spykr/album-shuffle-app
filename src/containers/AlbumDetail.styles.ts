import styled from "styled-components";

import { truncate } from "@/utils/styled";

const AlbumDetail = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px;

  /* Simulate padding at end of scroll */
  > *:last-child:after {
    bottom: 0;
    content: "";
    display: block;
    height: 32px;
    width: 1px;
  }
`;

const InfoContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  margin-top: -32px;
  max-width: 800px;
  width: 100%;

  @media (min-width: 600px) {
    margin-top: -42px;
  }
`;

const ImageContainer = styled.div`
  border: 2px solid white;
  border-radius: 2px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 1);
  height: calc(100vw - (32px * 2) - (32px * 2) - (48px * 2));
  max-height: 350px;
  max-width: 350px;
  position: relative;
  width: calc(100vw - (32px * 2) - (32px * 2) - (48px * 2));
`;

const TextContainer = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-top: 16px;
  text-align: center;

  @media (min-width: 500px) {
    margin-top: 24px;
  }
`;

const AlbumArtist = styled.span`
  font-size: 16px;

  @media (min-width: 350px) {
    font-size: 18px;
  }

  @media (min-width: 500px) {
    font-size: 24px;
  }
`;

const AlbumTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  margin-top: 4px;

  @media (min-width: 350px) {
    font-size: 24px;
    margin-top: 8px;
  }

  @media (min-width: 500px) {
    font-size: 32px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 2;
`;

const NavButton = styled.button`
  align-items: center;
  background: none;
  border: 0;
  color: white;
  cursor: pointer;
  display: flex;
  font-size: 30px;
  height: 32px;
  justify-content: center;
  padding: 0;
  text-decoration: none;
  width: 32px;

  @media (min-width: 600px) {
    font-size: 42px;
    height: 42px;
    width: 42px;
  }

  .fa-chevron-left {
    margin-left: auto;
  }
`;

const ButtonHeader = styled.span`
  ${truncate}
  color: white;
  font-size: 16px;
  font-weight: 300;
  text-align: center;

  @media (min-width: 500px) {
    font-size: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 300px;
  padding-top: 16px;
  width: 100%;

  @media (min-width: 500px) {
    max-width: 400px;
    padding-top: 24px;
  }

  & > *:not(:first-child) {
    margin-top: 16px;

    @media (min-width: 500px) {
      margin-top: 24px;
    }
  }
`;

export default {
  AlbumDetail,
  InfoContainer,
  ImageContainer,
  TextContainer,
  AlbumArtist,
  AlbumTitle,
  NavContainer,
  NavButton,
  ButtonHeader,
  ButtonContainer,
};
