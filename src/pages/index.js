import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { AlbumsContext } from "./_app";
import { Button } from "@/components/ui";
import AlbumSearch from "@/components/AlbumSearch";
import AlbumGrid from "@/components/AlbumGrid";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  z-index: 2;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-shrink: 0;
`;

const StyledButton = styled(Button)`
  border-radius: 0;
  font-size: 14px;
  padding: 24px 16px;
  width: 50%;

  @media (max-width: 330px) {
    font-size: 13px;
    padding: 16px;
  }

  @media (min-width: 360px) {
    font-size: 16px;
  }

  &:first-child {
    border-right: 1px solid black;
  }
`;

const Index = () => {
  const router = useRouter();
  const { albums, addAlbum, shuffleAlbums } = useContext(AlbumsContext);

  const goToRandomAlbum = () => {
    if (albums.length === 0) return;
    router.push(
      "/album/[index]",
      `/album/${Math.floor(Math.random() * albums.length)}`,
    );
  };

  return (
    <>
      <Header>
        <AlbumSearch albums={albums} onSelectResult={addAlbum} />
        <ButtonContainer>
          <StyledButton onClick={goToRandomAlbum}>
            <i className="fas fa-play" />
            Choose Random
          </StyledButton>
          <StyledButton onClick={shuffleAlbums}>
            <i className="fas fa-random" />
            Shuffle Albums
          </StyledButton>
        </ButtonContainer>
      </Header>
      <AlbumGrid albums={albums} />
    </>
  );
};

export default Index;
