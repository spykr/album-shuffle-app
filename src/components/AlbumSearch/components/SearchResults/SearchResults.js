import React from "react";
import styled, { css } from "styled-components";
import findIndex from "lodash/findIndex";
import SearchResult from "./components/SearchResult";
import { Loader } from "components/ui";

const Container = styled.div`
  background-color: black;
  box-shadow: 0 0 20px rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-height: 270px;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
  position: absolute;
  width: 100%;

  @media (min-width: 600px) {
    max-height: 350px;
  }

  ${p =>
    p.loading &&
    !p.noResults &&
    css`
      min-height: 160px;
    `}
`;

const NoResultsText = styled.p`
  color: white;
  font-size: 14px;
  opacity: 0.5;
  padding: 24px;
  text-align: center;
`;

const SearchResults = ({ albums, loading, results, onSelectResult }) => {
  const noResults = results && results.length === 0;
  return (
    <Container loading={loading} noResults={noResults}>
      {noResults && <NoResultsText>No albums found</NoResultsText>}
      {results &&
        results.map(result => (
          <SearchResult
            key={result.url}
            result={result}
            onSelect={() => onSelectResult(result)}
            disabled={findIndex(albums, a => a.url === result.url) !== -1}
          />
        ))}
      {loading && <Loader />}
    </Container>
  );
};

export default SearchResults;
