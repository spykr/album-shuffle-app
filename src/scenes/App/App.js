import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader";
import styled from "styled-components";
import Main from "scenes/Main";
import AlbumDetail from "scenes/AlbumDetail";

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
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Main albums={albums} setAlbums={setAlbums} />}
        />
        <Route
          exact
          path="/album/:index"
          render={props => (
            <AlbumDetail albums={albums} index={props.match.params.index} />
          )}
        />
      </Switch>
    </StyledApp>
  );
};

export default (process.env.NODE_ENV === "development"
  ? hot(module)(App)
  : App);
