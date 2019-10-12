import styled from "styled-components";

import { truncate } from "@/utils/styled";

const SearchResultListItem = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: white;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  font-size: 14px;
  padding: 8px;

  @media (min-width: 600px) {
    font-size: 18px;
    padding: 12px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  i {
    font-size: 24px;

    @media (min-width: 600px) {
      font-size: 32px;
    }
  }
`;

const ImageContainer = styled.div`
  border-radius: 2px;
  flex-shrink: 0;
  height: 2.2em;
  overflow: hidden;
  position: relative;
  width: 2.2em;
`;

const TextContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 8px;
  overflow: hidden;
  text-align: left;
`;

const Artist = styled.span`
  ${truncate}
  font-size: 0.85em;
  width: 100%;
`;

const Album = styled.span`
  ${truncate}
  font-size: 1em;
  font-weight: 700;
  margin-top: 0.15em;
  width: 100%;
`;

export default {
  SearchResultListItem,
  ImageContainer,
  TextContainer,
  Artist,
  Album,
};
