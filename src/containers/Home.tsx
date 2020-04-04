import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import Styled from "./Home.styles";
import AlbumSearch from "@/components/AlbumSearch";
import AlbumGrid from "@/components/AlbumGrid";
import LoginModal from "@/components/LoginModal";
import { AlbumsContext, AuthContext } from "@/utils/context";

const Home = () => {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { albums, loadingAlbums, addAlbum, shuffleAlbums } = useContext(
    AlbumsContext,
  );
  const { loggingIn, loggedIn, email } = useContext(AuthContext);

  const goToRandomAlbum = () => {
    if (albums.length === 0) return;
    router.push(
      "/album/[index]",
      `/album/${Math.floor(Math.random() * albums.length)}`,
    );
  };

  const logout = () => {
    Cookies.remove("email");
    Cookies.remove("token");
    window.location.reload();
  };

  return (
    <>
      <Styled.Header>
        <Styled.LoginBanner>
          {loggedIn ? (
            <>
              <span>
                <i className="fas fa-user-circle" />
                {email}
              </span>
              <Styled.LoginButton type="button" onClick={logout}>
                <i className="fas fa-sign-out-alt" />
                Logout
              </Styled.LoginButton>
            </>
          ) : (
            <>
              {loggingIn ? (
                <span>
                  <i className="fas fa-spinner fa-spin" />
                  Logging in...
                </span>
              ) : (
                <>
                  <span>Log in to view your albums across devices</span>
                  <Styled.LoginButton
                    type="button"
                    onClick={() => {
                      setShowLoginModal(true);
                    }}
                  >
                    <i className="fas fa-sign-in-alt" />
                    Log in
                  </Styled.LoginButton>
                </>
              )}
            </>
          )}
        </Styled.LoginBanner>
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
      <LoginModal
        open={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
        }}
      />
    </>
  );
};

export default Home;
