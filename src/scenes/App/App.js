import React, { useState, useEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import styled from "styled-components";
import API from "services/api";
import SearchResults from "components/SearchResults";
import debounce from "lodash/debounce";

const Input = styled.input`
  background-color: black;
  border: 0;
  color: white;
  font-size: 20px;
  padding: 16px;
  width: 100%;
`;

const App = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchCall = useRef(
    debounce(search => {
      API.searchAlbums(search)
        .then(response => {
          console.log(response);
          const albums = response.data.results.albummatches.album;
          console.log(albums);
          setSearchResults(albums);
        })
        .catch(error => console.error(error));
    }, 500),
  );

  useEffect(() => {
    console.log(searchCall.current);
    if (search.trim() === "") {
      setSearchResults([]);
    } else {
      searchCall.current(search);
    }
  }, [search]);

  return (
    <div className="App">
      <Input
        placeholder="Search albums..."
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      {searchResults.length > 0 && <SearchResults results={searchResults} />}
    </div>
  );
};

export default (process.env.NODE_ENV === "development"
  ? hot(module)(App)
  : App);
