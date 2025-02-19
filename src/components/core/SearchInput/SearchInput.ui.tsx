import React from "react";
import { SearchResult } from "../../../hooks/useSearch";

export interface SearchInputUIProps {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  onQueryChange: (value: string) => void;
}

export const SearchInputUI: React.FC<SearchInputUIProps> = ({ query, results, isLoading, onQueryChange }) => {
  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-500" />
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
          {results.map((result) => (
            <div key={result.id} className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0">
              <h3 className="text-sm font-medium text-gray-900">{result.title}</h3>
              <p className="text-sm text-gray-500">{result.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
