import { useState, useCallback, useEffect } from "react";

export interface SearchResult {
  id: string;
  title: string;
  description: string;
}

export interface UseSearchProps {
  initialQuery?: string;
  debounceMs?: number;
}

export const useSearch = ({ initialQuery = "", debounceMs = 300 }: UseSearchProps = {}) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock search function - in real world this would call an API
  const performSearch = useCallback(async (searchQuery: string) => {
    // Simulate API call
    const mockResults: SearchResult[] = [
      { id: "1", title: `Result 1 for "${searchQuery}"`, description: "Description 1" },
      { id: "2", title: `Result 2 for "${searchQuery}"`, description: "Description 2" },
      { id: "3", title: `Result 3 for "${searchQuery}"`, description: "Description 3" },
    ];
    return mockResults;
  }, []);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true);
        try {
          const searchResults = await performSearch(query);
          setResults(searchResults);
        } catch (error) {
          console.error("Search error:", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [query, debounceMs, performSearch]);

  return {
    query,
    setQuery,
    results,
    isLoading,
  };
};
