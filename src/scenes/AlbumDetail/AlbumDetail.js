import React, { useState } from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import pMinDelay from "p-min-delay";
import API from "services/api";
import { Button, Image } from "components/ui";
import { truncate } from "styled-utils";

const ScrollArea = styled.div`
  flex-grow: 1;
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
  overflow-y: auto;
`;

const StyledAlbumDetail = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px;
`;

const InfoContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: -32px;
  max-width: 800px;
  justify-content: center;
  width: 100%;

  @media (min-width: 600px) {
    margin-top: -42px;
  }
`;

const ImageContainer = styled.div`
  border-radius: 2px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 1);
  max-width: 350px;
  position: relative;
  width: calc(100vw - (32px * 2) - (32px * 2) - (48px * 2));
`;

const TextContainer = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-top: 16px;
  text-align: center;

  @media (min-width: 500px) {
    margin-top: 24px;
  }
`;

const AlbumArtist = styled.span`
  font-size: 16px;

  @media (min-width: 350px) {
    font-size: 18px;
  }

  @media (min-width: 500px) {
    font-size: 24px;
  }
`;

const AlbumTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  margin-top: 4px;

  @media (min-width: 350px) {
    font-size: 24px;
    margin-top: 8px;
  }

  @media (min-width: 500px) {
    font-size: 32px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 2;
`;

const NavButton = styled.button`
  align-items: center;
  background: none;
  border: 0;
  color: white;
  display: flex;
  font-size: 30px;
  height: 32px;
  justify-content: center;
  padding: 0;
  text-decoration: none;
  width: 32px;

  @media (min-width: 600px) {
    font-size: 42px;
    height: 42px;
    width: 42px;
  }

  .fa-chevron-left {
    margin-left: auto;
  }
`;

const ButtonHeader = styled.span`
  ${truncate}
  color: white;
  font-size: 16px;
  font-weight: 300;
  text-align: center;

  @media (min-width: 500px) {
    font-size: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 300px;
  padding-top: 16px;
  width: 100%;

  @media (min-width: 500px) {
    max-width: 400px;
    padding-top: 24px;
  }

  & > *:not(:first-child) {
    margin-top: 16px;

    @media (min-width: 500px) {
      margin-top: 24px;
    }
  }
`;

const AlbumDetail = withRouter(({ albums, index, onDelete, history }) => {
  const album = albums[index];
  const title = `${album.artist} ${album.name}`;
  const titleUrl = encodeURIComponent(title);
  const titleUrlPlus = titleUrl.replace(/%20/g, "+");

  const deleteAlbum = () => {
    onDelete(album);
    history.push("/");
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
      .catch(error => {
        setLoadingAppleLink(false);
        setAppleError(true);
      });
  };

  return (
    <ScrollArea>
      <StyledAlbumDetail>
        <NavContainer>
          <NavButton as={Link} to="/">
            <i className="fas fa-chevron-left" />
          </NavButton>
          <NavButton onClick={deleteAlbum}>
            <i className="fas fa-trash" />
          </NavButton>
        </NavContainer>
        <InfoContainer>
          <ImageContainer>
            <Image src={album.image[3]["#text"]} />
          </ImageContainer>
          <TextContainer>
            <AlbumArtist>{album.artist}</AlbumArtist>
            <AlbumTitle>{album.name}</AlbumTitle>
          </TextContainer>
        </InfoContainer>
        <ButtonContainer>
          <ButtonHeader>Listen on</ButtonHeader>
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
        </ButtonContainer>
      </StyledAlbumDetail>
    </ScrollArea>
  );
});

export default AlbumDetail;
