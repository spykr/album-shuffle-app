import React from "react";
import styled from "styled-components";
import { truncate } from "../../../styled-utils";

const Container = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: white;
  display: flex;
  font-size: 14px;
  padding: 8px;
`;

const Image = styled.img`
  background-color: darkgrey;
  border-radius: 2px;
  flex-shrink: 0;
  height: 32px;
  width: 32px;
`;

const TextContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  margin-left: 8px;
  text-align: left;
`;

const Artist = styled.span`
  ${truncate}
  font-size: 12px;
  width: 100%;
`;

const Album = styled.span`
  ${truncate}
  font-size: 14px;
  font-weight: 700;
  margin-top: 2px;
  width: 100%;
`;

const SearchResult = ({ result, onSelect }) => {
  return (
    <Container onClick={onSelect}>
      <Image alt={result.name} src={result.image[0]["#text"]} />
      <TextContainer>
        <Artist>{result.artist}</Artist>
        <Album>{result.name}</Album>
      </TextContainer>
    </Container>
  );
};

export default SearchResult;
