import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import AlbumGrid from "components/AlbumGrid";
import AlbumSearch from "components/AlbumSearch/AlbumSearch";
import { Button } from "components/ui";

const ButtonContainer = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  border-radius: 0;
  font-size: 14px;
  padding: 24px 16px;
  width: 50%;

  @media (min-width: 350px) {
    font-size: 16px;
  }

  &:first-child {
    border-right: 1px solid black;
  }
`;

const ScrollArea = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const Main = withRouter(({ albums, setAlbums, onShuffle, history }) => {
  const goToRandomAlbum = () =>
    history.push(`/album/${Math.floor(Math.random() * albums.length)}`);

  return (
    <>
      <AlbumSearch onSelectResult={album => setAlbums([album, ...albums])} />
      <ButtonContainer>
        <StyledButton onClick={goToRandomAlbum}>
          <i className="fas fa-play" />
          Choose Random
        </StyledButton>
        <StyledButton onClick={onShuffle}>
          <i className="fas fa-random" />
          Shuffle Albums
        </StyledButton>
      </ButtonContainer>
      <ScrollArea>
        <AlbumGrid albums={albums} />
      </ScrollArea>
    </>
  );
});

export default Main;
