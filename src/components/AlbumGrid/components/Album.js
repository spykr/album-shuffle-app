import React from "react";
import styled from "styled-components";
import { Image } from "components/ui";

const StyledAlbum = styled.button`
  border: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  position: relative;
  user-select: none;

  /* Force 1:1 aspect ratio */
  &::before {
    content: "";
    display: inline-block;
    padding-bottom: 100%;
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

const Album = ({ album }) => {
  return (
    <StyledAlbum>
      <AlbumImage alt={album.name} src={album.image[3]["#text"]} />
    </StyledAlbum>
  );
};

export default Album;
