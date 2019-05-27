import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader";
import shuffle from "lodash/shuffle";
import styled from "styled-components";
import Main from "scenes/Main";
import AlbumDetail from "scenes/AlbumDetail";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
`;

const savedAlbums = JSON.parse(localStorage.getItem("albums"));

const App = () => {
  const [albums, setAlbums] = useState(savedAlbums || []);
  useEffect(() => {
    localStorage.setItem("albums", JSON.stringify(albums));
  }, [albums]);

  const shuffleAlbums = () => setAlbums(shuffle(albums));

  return (
    <StyledApp>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Main
              albums={albums}
              setAlbums={setAlbums}
              onShuffle={shuffleAlbums}
            />
          )}
        />
        <Route
          exact
          path="/album/:index"
          render={props => (
            <AlbumDetail
              albums={albums}
              index={props.match.params.index}
              onDelete={album =>
                setAlbums(albums.filter(a => a.url !== album.url))
              }
            />
          )}
        />
      </Switch>
    </StyledApp>
  );
};

export default (process.env.NODE_ENV === "development"
  ? hot(module)(App)
  : App);
