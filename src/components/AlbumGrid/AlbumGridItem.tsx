import React from "react";
import Link from "next/link";

import Styled from "./AlbumGridItem.styles";
import { Album } from "@/utils/typings";

type Props = {
  album: Album;
  index: number;
};

const AlbumGridItem = ({ album, index }: Props) => {
  return (
    <Link href="/album/[index]" as={`/album/${index}`} passHref>
      <Styled.Album>
        <Styled.AlbumImage alt={album.title} src={album.imageUrl} />
        <Styled.AlbumInfo>
          <Styled.AlbumArtist>{album.artist}</Styled.AlbumArtist>
          <Styled.AlbumTitle>{album.title}</Styled.AlbumTitle>
        </Styled.AlbumInfo>
      </Styled.Album>
    </Link>
  );
};

export default AlbumGridItem;
