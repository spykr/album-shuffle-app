import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import styled from "styled-components";
import AlbumGrid from "components/AlbumGrid";
import AlbumSearch from "components/AlbumSearch/AlbumSearch";

const StyledApp = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const savedAlbums = JSON.parse(localStorage.getItem("albums"));

const App = () => {
  const [albums, setAlbums] = useState(savedAlbums || []);
  useEffect(() => {
    localStorage.setItem("albums", JSON.stringify(albums));
  }, [albums]);

  return (
    <StyledApp>
      <AlbumSearch onSelectResult={album => setAlbums([...albums, album])} />
      <AlbumGrid albums={albums} />
    </StyledApp>
  );
};

export default (process.env.NODE_ENV === "development"
  ? hot(module)(App)
  : App);
