import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Error from "next/error";
import pMinDelay from "p-min-delay";

import Styled from "./AlbumDetail.styles";
import { AlbumsContext } from "@/pages/_app";
import API from "@/services/api";
import { Button, Image, Loader } from "@/components/ui";

const AlbumDetail = ({ index }) => {
  const router = useRouter();
  const { albums, loadingAlbums, deleteAlbum } = useContext(AlbumsContext);
  if (loadingAlbums) {
    return <Loader backgroundColor="transparent" />;
  }

  const album = albums[index];
  if (!album) {
    return <Error statusCode={404} />;
  }

  const title = `${album.artist} ${album.name}`;
  const titleUrl = encodeURIComponent(title);
  const titleUrlPlus = titleUrl.replace(/%20/g, "+");

  const onDelete = () => {
    deleteAlbum(album);
    router.push("/");
  };

  const [appleLink, setAppleLink] = useState(null);
  const [appleError, setAppleError] = useState(false);
  const [loadingAppleLink, setLoadingAppleLink] = useState(false);
  const getAppleLink = () => {
    setLoadingAppleLink(true);
    setAppleError(false);
    pMinDelay(API.searchAppleMusic(titleUrlPlus), 500)
      .then(response => {
        setLoadingAppleLink(false);
        const album = response?.data?.results?.[0];
        if (album) {
          setAppleLink(album.collectionViewUrl);
        } else {
          setAppleError(true);
        }
      })
      .catch(() => {
        setLoadingAppleLink(false);
        setAppleError(true);
      });
  };

  return (
    <Styled.AlbumDetail>
      <Styled.NavContainer>
        <Link href="/" passHref>
          <Styled.NavButton as={"a"}>
            <i className="fas fa-chevron-left" />
          </Styled.NavButton>
        </Link>
        <Styled.NavButton onClick={onDelete}>
          <i className="fas fa-trash" />
        </Styled.NavButton>
      </Styled.NavContainer>
      <Styled.InfoContainer>
        <Styled.ImageContainer>
          <Image src={album.image[3]["#text"]} />
        </Styled.ImageContainer>
        <Styled.TextContainer>
          <Styled.AlbumArtist>{album.artist}</Styled.AlbumArtist>
          <Styled.AlbumTitle>{album.name}</Styled.AlbumTitle>
        </Styled.TextContainer>
      </Styled.InfoContainer>
      <Styled.ButtonContainer>
        <Styled.ButtonHeader>Listen on</Styled.ButtonHeader>
        <Button
          as="a"
          href={`https://open.spotify.com/search/albums/${titleUrl}`}
          target="_blank"
          color="#1DB954"
          backgroundColor="#083719"
        >
          <i className="fab fa-spotify" />
          Spotify
        </Button>
        <Button
          as="a"
          href={`https://play.google.com/store/search?q=${titleUrlPlus}&c=music`}
          target="_blank"
          color="#FF5722"
          backgroundColor="#561400"
        >
          <i className="fab fa-google-play" />
          Google Play
        </Button>
        {appleLink !== null ? (
          <Button
            as="a"
            href={appleLink}
            target="_blank"
            color="#FA57C1"
            backgroundColor="#620240"
          >
            <i className="fab fa-apple" />
            Apple Music
          </Button>
        ) : (
          <Button
            onClick={getAppleLink}
            color="#FA57C1"
            backgroundColor={
              loadingAppleLink || appleError ? "#44012c" : "#620240"
            }
            disabled={loadingAppleLink}
          >
            <i className="fab fa-apple" />
            {(() => {
              if (loadingAppleLink) {
                return "Loading...";
              } else if (appleError) {
                return "Error, try again";
              } else {
                return "Apple Music";
              }
            })()}
          </Button>
        )}
        <Button
          as="a"
          href={`https://www.youtube.com/results?search_query=${titleUrlPlus}`}
          target="_blank"
          color="#FF0000"
          backgroundColor="#4C0000"
        >
          <i className="fab fa-youtube" />
          YouTube
        </Button>
      </Styled.ButtonContainer>
    </Styled.AlbumDetail>
  );
};

AlbumDetail.getInitialProps = async ({ query }) => {
  return { index: query.index };
};

export default AlbumDetail;
