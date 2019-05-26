import React from "react";

const AlbumDetail = ({ albums, index }) => {
  const album = albums[index];
  return (
    <p style={{ color: "white" }}>
      {album.artist} - {album.name}
    </p>
  );
};

export default AlbumDetail;
