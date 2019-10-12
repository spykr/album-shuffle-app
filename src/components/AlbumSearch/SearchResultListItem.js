import React from "react";

import Styled from "./SearchResultListItem.styles";
import { Image } from "@/components/ui";

const SearchResultListItem = ({ result, onSelect, disabled }) => {
  return (
    <Styled.SearchResultListItem onClick={onSelect} disabled={disabled}>
      <Styled.ImageContainer>
        <Image
          alt={result.name}
          src={result.image[0]["#text"]}
          loaderProps={{ borderWidth: 2 }}
        />
      </Styled.ImageContainer>
      <Styled.TextContainer>
        <Styled.Artist>{result.artist}</Styled.Artist>
        <Styled.Album>{result.name}</Styled.Album>
      </Styled.TextContainer>
      {disabled && <i className="fas fa-check-circle" />}
    </Styled.SearchResultListItem>
  );
};

export default SearchResultListItem;
