import React from "react";
import AlbumGrid from "components/AlbumGrid";
import AlbumSearch from "components/AlbumSearch/AlbumSearch";

const Main = ({ albums, setAlbums }) => {
  return (
    <>
      <AlbumSearch onSelectResult={album => setAlbums([...albums, album])} />
      <AlbumGrid albums={albums} />
    </>
  );
};

export default Main;
