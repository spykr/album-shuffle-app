import styled, { css } from "styled-components";

const SearchResultList = styled.div<{
  loadingResults: boolean;
  noResults: boolean;
}>`
  -webkit-overflow-scrolling: touch;
  background-color: black;
  box-shadow: 0 0 20px rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-height: 270px;
  overflow-y: scroll;
  position: absolute;
  width: 100%;

  @media (min-width: 600px) {
    max-height: 350px;
  }

  ${(p) =>
    p.loadingResults &&
    !p.noResults &&
    css`
      min-height: 160px;
    `}
`;

const NoResultsText = styled.p`
  color: white;
  font-size: 14px;
  opacity: 0.5;
  padding: 24px;
  text-align: center;
`;

export default {
  SearchResultList,
  NoResultsText,
};
