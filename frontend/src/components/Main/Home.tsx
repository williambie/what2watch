import { Box, Button, HStack } from "@chakra-ui/react";
import MovieGrid from "./MovieGrid/MovieGrid";
import Paginator from "./Paginator";
import GenreFilter from "./SortingFiltering/GenreFilter";
import SortingButton from "./SortingFiltering/SortingButton";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../../queries/queries";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ResetFilters from "./SortingFiltering/ResetFilters";

// Home is the main page of the application
function Home() {
  const { searchTerm, page, sorting, selectedGenre } = useSelector(
    (state: RootState) => state.search,
  );

  const pageSize = 15;
  const { loading, data } = useQuery(GET_MOVIES, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      sortField: sorting.sortBy,
      sortOrder: sorting.sortOrder,
      genre: selectedGenre,
      searchTerm: searchTerm,
    },
  });

  const movies = data?.movies.movies || [];
  const moviesCount = data?.movies.moviesCount || 0;

  const totalPages = Math.ceil(moviesCount / pageSize);

  // The main page is displayed
  return (
    <>
      <HStack paddingLeft={"30px"}>
        <GenreFilter />
        <SortingButton />
        <ResetFilters />
      </HStack>
      <Box padding="5">
        <MovieGrid movies={movies} loading={loading} />
      </Box>
      <HStack justifyContent="space-evenly" marginBottom="50px">
        <Paginator totalPages={totalPages} />
      </HStack>
    </>
  );
}

export default Home;
