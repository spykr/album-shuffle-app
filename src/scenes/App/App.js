import React, { useState, useEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import styled from "styled-components";
import API from "services/api";
import SearchResults from "components/SearchResults";
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

const AlbumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 375px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const Album = styled.button`
  border: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  position: relative;
  user-select: none;

  /* Force 1:1 aspect ratio */
  &::before {
    content: "";
    display: inline-block;
    padding-bottom: 100%;
  }
`;

const AlbumImage = styled.img`
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
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

  const [albums, setAlbums] = useState([]);

  return (
    <div className="App">
      <Input
        placeholder="Search albums..."
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      {searchResults.length > 0 && (
        <SearchResults
          results={searchResults}
          onSelectResult={album => {
            setSearch("");
            setAlbums([...albums, album]);
          }}
        />
      )}
      <AlbumGrid>
        {albums.map(album => (
          <Album>
            <AlbumImage alt={album.name} src={album.image[3]["#text"]} />
          </Album>
        ))}
      </AlbumGrid>
    </div>
  );
};

export default (process.env.NODE_ENV === "development"
  ? hot(module)(App)
  : App);
