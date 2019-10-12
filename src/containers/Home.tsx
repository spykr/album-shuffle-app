import React, { useContext } from "react";
import { useRouter } from "next/router";

import Styled from "./Home.styles";
import AlbumSearch from "@/components/AlbumSearch";
import AlbumGrid from "@/components/AlbumGrid";
import AlbumsContext from "@/utils/context";

const Home = () => {
  const router = useRouter();
  const { albums, loadingAlbums, addAlbum, shuffleAlbums } = useContext(
    AlbumsContext,
  );

  const goToRandomAlbum = () => {
    if (albums.length === 0) return;
    router.push(
      "/album/[index]",
      `/album/${Math.floor(Math.random() * albums.length)}`,
    );
  };

  return (
    <>
      <Styled.Header>
        <AlbumSearch albums={albums} onSelectResult={addAlbum} />
        <Styled.ButtonContainer>
          <Styled.Button onClick={goToRandomAlbum}>
            <i className="fas fa-play" />
            Choose Random
          </Styled.Button>
          <Styled.Button onClick={shuffleAlbums}>
            <i className="fas fa-random" />
            Shuffle Albums
          </Styled.Button>
        </Styled.ButtonContainer>
      </Styled.Header>
      <AlbumGrid albums={albums} loading={loadingAlbums} />
    </>
  );
};

export default Home;
