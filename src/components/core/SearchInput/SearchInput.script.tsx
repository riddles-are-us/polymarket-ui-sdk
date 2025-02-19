import { useSearch, UseSearchProps, SearchResult } from "../../../hooks/useSearch";

export type { SearchResult, UseSearchProps };

export const useSearchInputScript = (props: UseSearchProps) => {
  return useSearch(props);
};
