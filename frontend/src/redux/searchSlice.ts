import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchState } from "../types/reduxTypes";

const initialState: SearchState = {
  searchTerm: "",
  page: 1,
  sorting: {
    sortBy: "popularity",
    sortOrder: -1,
  },
  selectedGenre: "Genres",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.page = 1;
      state.selectedGenre = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
    setSelectedGenre: (state, action: PayloadAction<string | null>) => {
      state.selectedGenre = action.payload;
      state.page = 1;
    },
    resetFilter: (state) => {
      state.searchTerm = "";
      state.page = 1;
      state.selectedGenre = null;
      state.sorting.sortBy = "popularity";
      state.sorting.sortOrder = -1;
    },
  },
});

export const {
  setSearchTerm,
  setPage,
  setSorting,
  setSelectedGenre,
  resetFilter,
} = searchSlice.actions;
export default searchSlice.reducer;
