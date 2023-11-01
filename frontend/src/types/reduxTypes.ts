export interface SearchState {
  searchTerm: string;
  page: number;
  sorting: {
    sortBy: string;
    sortOrder: number;
  };
  selectedGenre: string | null;
}

export type SearchActions =
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_PAGE"; payload: number };
