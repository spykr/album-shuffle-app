import React from "react";

import Styled from "./AlbumGrid.styles";
import Album from "./AlbumGridItem";
import { Loader } from "@/components/ui";

const AlbumGrid = ({ albums, loading }) => {
  return (
    <Styled.AlbumGrid>
      {loading ? (
        <Loader backgroundColor="transparent" />
      ) : albums.length === 0 ? (
        <Styled.EmptyListText>
          No albums added to your list,
          <br />
          search above to find one.
        </Styled.EmptyListText>
      ) : (
        albums.map((album, i) => (
          <Album key={album.url} album={album} index={i} />
        ))
      )}
    </Styled.AlbumGrid>
  );
};

export default AlbumGrid;
