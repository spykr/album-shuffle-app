import React, { useState, useEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import styled from "styled-components";
import API from "services/api";
import SearchResults from "components/SearchResults";
import AlbumGrid from "components/AlbumGrid";
import debounce from "lodash/debounce";

const Input = styled.input`
  background-color: black;
  border: 0;
  box-sizing: border-box;
  color: white;
  font-size: 20px;
  padding: 16px;
  width: 100%;
`;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const searchCall = useRef(
    debounce(search => {
      setLoading(true);
      API.searchAlbums(search)
        .then(response => {
          console.log(response);
          const albums = response.data.results.albummatches.album;
          console.log(albums);
          setSearchResults(albums);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }, 400),
  );

  useEffect(() => {
    if (search.trim() === "") {
      setSearchResults(null);
    } else {
      searchCall.current(search);
    }
  }, [search]);

  const [albums, setAlbums] = useState([]);

  return (
    <div className="App">
      <Input
        placeholder="Search albums..."
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      {(loading || searchResults !== null) && (
        <SearchResults
          loading={loading}
          results={searchResults}
          onSelectResult={album => {
            setSearch("");
            setAlbums([...albums, album]);
          }}
        />
      )}
      <AlbumGrid albums={albums} />
    </div>
  );
};

export default (process.env.NODE_ENV === "development"
  ? hot(module)(App)
  : App);
