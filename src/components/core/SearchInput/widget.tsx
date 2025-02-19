import React from "react";
import { SearchInputUI } from "./SearchInput.ui";
import { useSearchInputScript, UseSearchProps } from "./SearchInput.script";

export interface SearchInputProps extends UseSearchProps {}

export const SearchInput: React.FC<SearchInputProps> = (props) => {
  const { query, setQuery, results, isLoading } = useSearchInputScript(props);

  return <SearchInputUI query={query} results={results} isLoading={isLoading} onQueryChange={setQuery} />;
};
