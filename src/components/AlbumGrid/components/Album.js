import React from "react";
import styled from "styled-components";
import Link from "next/link";

import { truncate } from "@/utils/styled";
import { Image } from "@/components/ui";

const StyledAlbum = styled.a`
  border: 0;
  cursor: pointer;
  line-height: 0;
  margin: 0;
  padding: 0;
  position: relative;
  transition: box-shadow 0.2s, transform 0.2s;
  user-select: none;

  /* Force 1:1 aspect ratio */
  &::before {
    content: "";
    display: inline-block;
    padding-bottom: 100%;
  }

  &:hover,
  &:focus {
    box-shadow: 0 0 20px rgba(0, 0, 0, 1);
    transform: scale(1.015);
    z-index: 1;
  }
`;

const AlbumImage = styled(Image)`
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
`;

const AlbumInfo = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  bottom: 0;
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
  left: 0;
  opacity: 0;
  padding: 12px;
  position: absolute;
  text-align: left;
  transition: opacity 0.2s;
  width: 100%;

  ${StyledAlbum}:hover &,
  ${StyledAlbum}:focus & {
    opacity: 1;
  }
`;

const AlbumArtist = styled.span`
  ${truncate}
  font-size: 14px;
  line-height: 1.3;
`;

const AlbumTitle = styled.span`
  ${truncate}
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
  margin-top: 2px;
`;

const Album = ({ album, index }) => {
  return (
    <Link href="/album/[index]" as={`/album/${index}`} passHref>
      <StyledAlbum>
        <AlbumImage alt={album.name} src={album.image[3]["#text"]} />
        <AlbumInfo>
          <AlbumArtist>{album.artist}</AlbumArtist>
          <AlbumTitle>{album.name}</AlbumTitle>
        </AlbumInfo>
      </StyledAlbum>
    </Link>
  );
};

export default Album;
