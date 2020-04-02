import styled, { css } from "styled-components";

type AlbumGridProps = {
  stretch: boolean;
};

const AlbumGrid = styled.div<AlbumGridProps>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  position: relative;

  ${p =>
    p.stretch &&
    css`
      flex-grow: 1;
    `}

  @media (min-width: 375px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const EmptyListText = styled.p`
  box-sizing: border-box;
  color: white;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.6;
  margin: 0;
  opacity: 0.5;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
`;

export default {
  AlbumGrid,
  EmptyListText,
};
