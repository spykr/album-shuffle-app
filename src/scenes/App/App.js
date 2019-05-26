import React, { useState, useEffect, useRef } from "react";
import { hot } from "react-hot-loader";
import styled from "styled-components";
import API from "services/api";
import SearchResults from "components/SearchResults";
import debounce from "lodash/debounce";
import { Image } from "components/ui";

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

const AlbumImage = styled(Image)`
  height: 100%;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
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
      <AlbumGrid>
        {albums.map(album => (
          <Album key={album.url}>
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
