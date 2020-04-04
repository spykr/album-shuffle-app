import App from "next/app";
import Head from "next/head";
import React, { useEffect, useState, useRef } from "react";
import shuffle from "lodash/shuffle";
import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import isEqual from "lodash/isEqual";

import { AlbumsContext, AuthContext } from "@/utils/context";
import { Album } from "@/utils/typings";
import { login, getAlbums, saveAlbums } from "@/services/api";

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

interface Props {
  children: React.ReactNode;
}

const MyComponent = ({ children }: Props) => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [localMode, setLocalMode] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const params = { email: query.get("email"), token: query.get("token") };
    const cookies = {
      email: Cookies.get("email"),
      token: Cookies.get("token"),
    };

    // If there's a token in the query string, use it to login
    if (params.email && params.token) {
      setLoggingIn(true);
      Cookies.remove("email");
      Cookies.remove("token");
      login(params.email, params.token)
        .then((response) => {
          setLoggedIn(true);
          const { email, token } = response.data;
          setEmail(email);
          setToken(token);
          Cookies.set("email", email, { expires: 30 });
          Cookies.set("token", token, { expires: 30 });
        })
        .catch(() => {
          window.alert("There was an error logging in, please try again.");
        })
        .finally(() => {
          setLoggingIn(false);
        });
      // Clear the query string
      window.history.replaceState({}, document.title, "/");
      return;
    }

    // Or if there's a token in the cookies, use that
    if (cookies.email && cookies.token) {
      setLoggedIn(true);
      setEmail(cookies.email);
      setToken(cookies.token);
      return;
    }

    // Otherwise the user is in 'local' mode
    setLocalMode(true);
  }, []);

  const [albums, setAlbums] = useState<Album[]>([]);
  const previousAlbums = useRef<Album[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);
  const addAlbum = (album: Album) => {
    setAlbums([album, ...albums]);
  };
  const deleteAlbum = (album: Album) => {
    setAlbums(albums.filter((a) => a.url !== album.url));
  };
  const shuffleAlbums = () => {
    setAlbums(shuffle(albums));
  };

  const ready = localMode || loggedIn;
  useEffect(() => {
    if (loadingAlbums && ready) {
      if (localMode) {
        const savedAlbums = JSON.parse(localStorage.getItem("albums") || "[]");
        if (savedAlbums) {
          setAlbums(savedAlbums);
          previousAlbums.current = albums;
        }
        setLoadingAlbums(false);
      } else {
        getAlbums()
          .then((albums) => {
            setLoadingAlbums(false);
            previousAlbums.current = albums;
            const savedAlbums = JSON.parse(
              localStorage.getItem("albums") || "[]",
            );
            if (savedAlbums) {
              // Merge any albums from local storage in to the API result
              albums = [...albums, ...savedAlbums];
              // Remove any duplicates
              albums = albums.filter(
                (a, i) => albums.findIndex((b) => b.url === a.url) === i,
              );
              // Clear local storage
              localStorage.setItem("albums", "[]");
            }
            setAlbums(albums);
          })
          .catch((err: AxiosError) => {
            if (err.response?.status === 401) {
              // Token has expired, clear cookies and reload
              Cookies.remove("email");
              Cookies.remove("token");
              window.location.reload();
              return;
            }
          });
      }
    }
  }, [loadingAlbums, ready]);

  // Save the album list whenever it changes
  useEffect(() => {
    if (isEqual(albums, previousAlbums.current)) {
      return;
    }

    if (localMode) {
      localStorage.setItem("albums", JSON.stringify(albums));
    } else {
      saveAlbums(albums).catch((err) => {
        if (err.response?.status === 401) {
          // Token has expired, clear cookies and reload
          Cookies.remove("email");
          Cookies.remove("token");
          window.location.reload();
          return;
        }
      });
    }
    previousAlbums.current = albums;
  }, [albums]);

  return (
    <AuthContext.Provider
      value={{
        loggingIn,
        loggedIn,
        localMode,
        email,
        token,
      }}
    >
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
    </AuthContext.Provider>
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
