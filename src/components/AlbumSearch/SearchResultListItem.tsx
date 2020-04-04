import React from "react";

import Styled from "./SearchResultListItem.styles";
import { Image } from "@/components/ui";
import { Album } from "@/utils/typings";

type Props = {
  result: Album;
  onSelect(e: React.MouseEvent<HTMLButtonElement>): void;
  disabled: boolean;
};

const SearchResultListItem = ({ result, onSelect, disabled }: Props) => {
  return (
    <Styled.SearchResultListItem onClick={onSelect} disabled={disabled}>
      <Styled.ImageContainer>
        <Image
          alt={result.title}
          src={result.thumbnailUrl}
          loaderProps={{ borderWidth: 2 }}
        />
      </Styled.ImageContainer>
      <Styled.TextContainer>
        <Styled.Artist>{result.artist}</Styled.Artist>
        <Styled.Album>{result.title}</Styled.Album>
      </Styled.TextContainer>
      {disabled && <i className="fas fa-check-circle" />}
    </Styled.SearchResultListItem>
  );
};

export default SearchResultListItem;
