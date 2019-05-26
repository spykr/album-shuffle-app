import React from "react";
import styled, { css } from "styled-components";
import SearchResult from "./components/SearchResult";
import { Loader } from "components/ui";

const Container = styled.div`
  background-color: black;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-height: 270px;
  overflow-y: scroll;
  position: absolute;
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
