import React from "react";

import { Album } from "@/utils/typings";

type Props = {
  albums: Album[];
  loadingAlbums: boolean;
  addAlbum(album: Album): void;
  deleteAlbum(album: Album): void;
  shuffleAlbums(): void;
};

export default React.createContext<Props>({
  albums: [],
  loadingAlbums: true,
  addAlbum: () => {},
  deleteAlbum: () => {},
  shuffleAlbums: () => {},
});
