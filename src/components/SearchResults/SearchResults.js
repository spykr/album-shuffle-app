import React from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult";

const Container = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-height: 320px;
  overflow-y: scroll;
  width: 100%;
`;

const SearchResults = ({ results }) => {
  return (
    <Container>
      {results.map(result => (
        <SearchResult key={result.url} result={result} />
      ))}
    </Container>
  );
};

export default SearchResults;
