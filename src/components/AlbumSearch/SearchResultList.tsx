import React from "react";
import findIndex from "lodash/findIndex";

import Styled from "./SearchResultList.styles";
import SearchResultListItem from "./SearchResultListItem";
import { Loader } from "@/components/ui";
import { Album } from "@/utils/typings";

type Props = {
  albums: Album[];
  loading: boolean;
  results: Album[] | null;
  onSelectResult(album: Album, e: React.MouseEvent<HTMLButtonElement>): void;
};

const SearchResultList = ({
  albums,
  loading,
  results,
  onSelectResult,
}: Props) => {
  const noResults = results !== null && results.length === 0;
  return (
    <Styled.SearchResultList loadingResults={loading} noResults={noResults}>
      {noResults && (
        <Styled.NoResultsText>No albums found</Styled.NoResultsText>
      )}
      {results &&
        results.map((result) => (
          <SearchResultListItem
            key={result.url}
            result={result}
            onSelect={(e) => {
              onSelectResult(result, e);
            }}
            disabled={findIndex(albums, (a) => a.url === result.url) !== -1}
          />
        ))}
      {loading && <Loader />}
    </Styled.SearchResultList>
  );
};

export default SearchResultList;
