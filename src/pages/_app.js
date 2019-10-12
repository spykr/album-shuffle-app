import App from "next/app";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import shuffle from "lodash/shuffle";
import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";

export const AlbumsContext = React.createContext([]);

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html {
    background-color: rgba(0, 0, 0, 0.9);
  }

  body {
    font-family: 'Open Sans', sans-serif;
    min-width: 320px;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    width: 100%;
  }

  button {
    text-shadow: inherit;
  }

  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100vh;
    width: 100%;
  }
`;

const MyComponent = ({ children }) => {
  const [albums, setAlbums] = useState([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);
  const addAlbum = album => {
    setAlbums([album, ...albums]);
  };
  const deleteAlbum = album => {
    setAlbums(albums.filter(a => a.url !== album.url));
  };
  const shuffleAlbums = () => {
    setAlbums(shuffle(albums));
  };

  useEffect(() => {
    if (loadingAlbums) {
      const savedAlbums = JSON.parse(localStorage.getItem("albums"));
      if (savedAlbums) {
        setAlbums(savedAlbums);
      }
      setLoadingAlbums(false);
    } else {
      localStorage.setItem("albums", JSON.stringify(albums));
    }
  }, [albums]);

  return (
    <AlbumsContext.Provider
      value={{
        albums,
        loadingAlbums,
        addAlbum,
        deleteAlbum,
        shuffleAlbums,
      }}
    >
      {children}
    </AlbumsContext.Provider>
  );
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <MyComponent>
        <Head>
          <title>Album Shuffle</title>
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </MyComponent>
    );
  }
}

export default MyApp;
