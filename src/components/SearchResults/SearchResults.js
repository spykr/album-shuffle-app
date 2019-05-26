import React from "react";
import styled, { css } from "styled-components";
import SearchResult from "./components/SearchResult";
import { Loader } from "components/ui";

const Container = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-height: 320px;
  overflow-y: scroll;
  position: relative;
  width: 100%;

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

const SearchResults = ({ loading, results, onSelectResult }) => {
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
          />
        ))}
      {loading && <Loader />}
    </Container>
  );
};

export default SearchResults;
