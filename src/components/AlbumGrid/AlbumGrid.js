import React from "react";

import Styled from "./AlbumGrid.styles";
import Album from "./AlbumGridItem";

const AlbumGrid = ({ albums }) => {
  return (
    <Styled.AlbumGrid>
      {albums.map((album, i) => (
        <Album key={album.url} album={album} index={i} />
      ))}
    </Styled.AlbumGrid>
  );
};

export default AlbumGrid;
