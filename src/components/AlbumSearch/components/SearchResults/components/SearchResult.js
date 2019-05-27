import React from "react";
import styled from "styled-components";
import { Image } from "components/ui";
import { truncate } from "styled-utils";

const Container = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: white;
  display: flex;
  flex-shrink: 0;
  font-size: 14px;
  padding: 8px;

  @media (min-width: 600px) {
    font-size: 18px;
    padding: 12px;
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

const SearchResult = ({ result, onSelect }) => {
  return (
    <Container onClick={onSelect}>
      <ImageContainer>
        <Image
          alt={result.name}
          src={result.image[0]["#text"]}
          loaderProps={{ borderWidth: 2 }}
        />
      </ImageContainer>
      <TextContainer>
        <Artist>{result.artist}</Artist>
        <Album>{result.name}</Album>
      </TextContainer>
    </Container>
  );
};

export default SearchResult;
