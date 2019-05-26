import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Button } from "components/ui";

const StyledAlbumDetail = styled.div`
  display: flex;
`;

const AlbumDetail = withRouter(({ albums, index, onDelete, history }) => {
  const album = albums[index];
  const deleteAlbum = () => {
    onDelete(album);
    history.push("/");
  };
  return (
    <StyledAlbumDetail>
      <p style={{ color: "white" }}>
        {album.artist} - {album.name}
      </p>
      <Button onClick={deleteAlbum}>delete</Button>
    </StyledAlbumDetail>
  );
});

export default AlbumDetail;
