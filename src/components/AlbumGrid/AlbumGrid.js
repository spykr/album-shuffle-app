import React from "react";
import styled from "styled-components";
import Album from "./components/Album";

const StyledAlbumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

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

const AlbumGrid = ({ albums }) => {
  return (
    <StyledAlbumGrid>
      {albums.map(album => (
        <Album key={album.url} album={album} />
      ))}
    </StyledAlbumGrid>
  );
};

export default AlbumGrid;
