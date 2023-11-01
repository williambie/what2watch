import { Box, HStack } from "@chakra-ui/react";
import MovieGrid from "./MovieGrid/MovieGrid";
import Paginator from "./Paginator";
import GenreFilter from "./SortingFiltering/GenreFilter";
import SortingButton from "./SortingFiltering/SortingButton";
import { useState } from "react";
import SearchFilter from "./SortingFiltering/SearchFilter";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../../queries/queries";

export interface MovieQuery {
  genre: string | null;
  sortBy: string;
  sortOrder: number;
}

interface HomeProps {
  searchTerm: string;
}

const pageSize = 15;

// Home is the main page of the application
function Home({ searchTerm }: HomeProps) {
  const [page, setPage] = useState(1);

  const [movieQuery, setMovieQuery] = useState<MovieQuery>({
    genre: null,
    sortBy: "popularity",
    sortOrder: -1,
  });

  const { loading, data } = useQuery(GET_MOVIES, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      sortField: movieQuery.sortBy,
      sortOrder: movieQuery.sortOrder,
      genre: movieQuery.genre,
    },
  });

  const movies = data?.movies.movies || [];
  const moviesCount = data?.movies.moviesCount || 0;

  const totalPages = Math.ceil(moviesCount / pageSize);

  const handleSortChange = (sortOptions: {
    sortBy: string;
    sortOrder: number;
  }) => {
    setMovieQuery((prevState) => ({ ...prevState, ...sortOptions }));
  };

  // The main page is displayed
  return (
    <>
      <HStack paddingLeft={"30px"}>
        <GenreFilter
          onSelectGenre={(genre) => {
            setMovieQuery({ ...movieQuery, genre });
            setPage(1);
          }}
        />
        <SortingButton onSortChange={handleSortChange} />
      </HStack>
      <Box padding="5">
        {searchTerm ? (
          <SearchFilter movies={movies} searchTerm={searchTerm} />
        ) : (
          <MovieGrid movies={movies} loading={loading} />
        )}
      </Box>
      <HStack justifyContent="space-evenly" marginBottom="50px">
        <Paginator page={page} setPage={setPage} totalPages={totalPages} />
      </HStack>
    </>
  );
}

export default Home;
