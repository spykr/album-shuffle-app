import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import styled from "styled-components";
import API from "services/api";
import SearchResults from "./components/SearchResults";

const StyledAlbumSearch = styled.div`
  flex-shrink: 0;
  position: relative;
  z-index: 2;
`;

const InputClearButton = styled.button`
  align-items: center;
  background: none;
  border: 0;
  color: white;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: calc(32px + 16px);

  i {
    font-size: 16px;
  }
`;

const Input = styled.input`
  background-color: black;
  border: 0;
  box-sizing: border-box;
  color: white;
  font-size: 20px;
  padding: 16px;
  ${p => p.typing && `padding-right: calc(32px + 16px)`};
  width: 100%;

  @media (max-width: 370px) {
    font-size: 17px;
  }

  &::placeholder {
    font-weight: 300;
  }
`;

const AlbumSearch = ({ albums, onSelectResult }) => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const searchCall = useRef(
    debounce((search, cancelToken) => {
      setLoading(true);
      API.searchAlbums(search, cancelToken.token)
        .then(response => {
          console.log("Search response:", response);
          const albums = response.data.results.albummatches.album;
          setSearchResults(albums);
          setLoading(false);
        })
        .catch(error => {
          if (!axios.isCancel(error)) {
            console.log("Error on search:", error);
          }
          setLoading(false);
        });
    }, 400),
  );

  useEffect(() => {
    if (search.trim() === "") {
      setSearchResults(null);
      setLoading(false);
    } else {
      const cancelToken = axios.CancelToken.source();
      searchCall.current(search, cancelToken);
      // Cancel request on change
      return () => {
        cancelToken.cancel();
      };
    }
  }, [search]);

  return (
    <StyledAlbumSearch>
      <Input
        placeholder="Search for albums to add to your list..."
        onChange={e => setSearch(e.target.value)}
        value={search}
        typing={search !== ""}
      />
      {search !== "" && (
        <InputClearButton onClick={() => setSearch("")}>
          <i className="fas fa-times-circle" />
        </InputClearButton>
      )}
      {(loading || searchResults !== null) && (
        <SearchResults
          albums={albums}
          loading={loading}
          results={searchResults}
          onSelectResult={album => {
            setSearch("");
            onSelectResult(album);
          }}
        />
      )}
    </StyledAlbumSearch>
  );
};

export default AlbumSearch;
