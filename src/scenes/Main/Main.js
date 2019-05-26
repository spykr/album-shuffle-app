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
  font-size: 16px;
  padding: 24px 16px;
  width: 50%;

  &:first-child {
    border-right: 1px solid black;
  }
`;

const Main = withRouter(({ albums, setAlbums, onShuffle, history }) => {
  const goToRandomAlbum = () =>
    history.push(`/album/${Math.floor(Math.random() * albums.length)}`);

  return (
    <>
      <AlbumSearch onSelectResult={album => setAlbums([...albums, album])} />
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
      <AlbumGrid albums={albums} />
    </>
  );
});

export default Main;
