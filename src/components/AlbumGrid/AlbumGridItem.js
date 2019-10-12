import React from "react";
import Link from "next/link";

import Styled from "./AlbumGridItem.styles";

const Album = ({ album, index }) => {
  return (
    <Link href="/album/[index]" as={`/album/${index}`} passHref>
      <Styled.Album>
        <Styled.AlbumImage alt={album.name} src={album.image[3]["#text"]} />
        <Styled.AlbumInfo>
          <Styled.AlbumArtist>{album.artist}</Styled.AlbumArtist>
          <Styled.AlbumTitle>{album.name}</Styled.AlbumTitle>
        </Styled.AlbumInfo>
      </Styled.Album>
    </Link>
  );
};

export default Album;
