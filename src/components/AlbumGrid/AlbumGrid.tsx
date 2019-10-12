import React from "react";

import Styled from "./AlbumGrid.styles";
import AlbumGridItem from "./AlbumGridItem";
import { Loader } from "@/components/ui";
import { Album } from "@/utils/typings";

type Props = {
  albums: Album[];
  loading: boolean;
};

const AlbumGrid = ({ albums, loading }: Props) => {
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
          <AlbumGridItem key={album.url} album={album} index={i} />
        ))
      )}
    </Styled.AlbumGrid>
  );
};

export default AlbumGrid;
