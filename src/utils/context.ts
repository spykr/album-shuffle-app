/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

import { Album } from "@/utils/typings";

type AlbumProps = {
  albums: Album[];
  loadingAlbums: boolean;
  addAlbum(album: Album): void;
  deleteAlbum(album: Album): void;
  shuffleAlbums(): void;
};

export const AlbumsContext = React.createContext<AlbumProps>({
  albums: [],
  loadingAlbums: true,
  addAlbum: () => {},
  deleteAlbum: () => {},
  shuffleAlbums: () => {},
});

type AuthProps = {
  loggingIn: boolean;
  loggedIn: boolean;
  localMode: boolean;
  email: string;
  token: string;
};

export const AuthContext = React.createContext<AuthProps>({
  loggingIn: false,
  loggedIn: false,
  localMode: false,
  email: "",
  token: "",
});
