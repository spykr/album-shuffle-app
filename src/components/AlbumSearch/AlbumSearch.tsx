import React, { useState, useEffect, useRef } from "react";
import axios, { CancelTokenSource } from "axios";
import debounce from "lodash/debounce";

import Styled from "./AlbumSearch.styles";
import API from "@/services/api";
import SearchResultList from "./SearchResultList";
import { Album } from "@/utils/typings";

type Props = {
  albums: Album[];
  onSelectResult(album: Album): void;
};

const AlbumSearch = ({ albums, onSelectResult }: Props) => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const searchCall = useRef(
    debounce((search: string, cancelToken: CancelTokenSource) => {
      setLoading(true);
      API.searchAlbums(search, cancelToken.token)
        .then(response => {
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
    <Styled.AlbumSearch>
      <Styled.Input
        placeholder="Find an album for your list..."
        onChange={e => setSearch(e.target.value)}
        value={search}
        typing={search !== ""}
      />
      {search !== "" && (
        <Styled.InputClearButton onClick={() => setSearch("")}>
          <i className="fas fa-times-circle" />
        </Styled.InputClearButton>
      )}
      {(loading || searchResults !== null) && (
        <SearchResultList
          albums={albums}
          loading={loading}
          results={searchResults}
          onSelectResult={(album: Album) => {
            setSearch("");
            onSelectResult(album);
          }}
        />
      )}
    </Styled.AlbumSearch>
  );
};

export default AlbumSearch;
