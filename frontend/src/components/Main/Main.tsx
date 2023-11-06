import { Box, Flex, HStack } from "@chakra-ui/react";
import MovieGrid from "./MovieGrid/MovieGrid";
import Paginator from "./Paginator/Paginator";
import GenreFilter from "./SortingFiltering/GenreFilter";
import SortingButton from "./SortingFiltering/SortingButton";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../../queries/queries";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ResetFilters from "./SortingFiltering/ResetFilters";

function Main() {
  const { searchTerm, page, sorting, selectedGenre } = useSelector(
    (state: RootState) => state.search,
  );

  const pageSize = 20;
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
      <Flex direction={["column", "row"]}>
        <Box padding="2">
          <GenreFilter />
        </Box>
        <Box padding="2">
          <SortingButton />
        </Box>
        <Box padding="2">
          <ResetFilters />
        </Box>
      </Flex>
      <Box padding="5">
        <MovieGrid movies={movies} loading={loading} />
      </Box>
      <HStack justifyContent="space-evenly" marginBottom="50px">
        <Paginator totalPages={totalPages} movieCount={moviesCount} />
      </HStack>
    </>
  );
}

export default Main;
