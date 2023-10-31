import { Box, HStack } from "@chakra-ui/react";
import MovieGrid from "./MovieGrid/MovieGrid";
import Paginator from "./Paginator";
import GenreFilter from "./SortingFiltering/GenreFilter";
import SortingButton from "./SortingFiltering/SortingButton";
import { useState } from "react";
import SearchFilter from "./SortingFiltering/SearchFilter";
import { useQuery } from "@apollo/client";
import { GET_MOVIES, GET_MOVIE_COUNT } from "../queries/queries";

export interface MovieQuery {
  genre: number | null;
  sortBy: string;
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
  });

  const { loading, data } = useQuery(GET_MOVIES, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  const { data: countData } = useQuery(GET_MOVIE_COUNT);

  const movies = data?.movies || [];
  const moviesCount = countData?.moviesCount || 0;

  const totalPages = Math.ceil(moviesCount / pageSize);
  console.log("Total pages", totalPages);

  const handleSortChange = (sortBy: string) => {
    setMovieQuery({ ...movieQuery, sortBy });
  };

  // The main page is displayed
  return (
    <>
      <HStack paddingLeft={"30px"}>
        <GenreFilter
          onSelectGenre={(genre) => setMovieQuery({ ...movieQuery, genre })}
        />
        <SortingButton onSortChange={handleSortChange} />
      </HStack>
      <Box padding="5">
        {searchTerm ? (
          <SearchFilter movies={movies} searchTerm={searchTerm} />
        ) : (
          <MovieGrid
            sortBy={movieQuery.sortBy}
            genre={movieQuery.genre}
            movies={movies}
            loading={loading}
          />
        )}
      </Box>
      <HStack justifyContent="space-evenly" marginBottom="50px">
        <Paginator page={page} setPage={setPage} totalPages={totalPages} />
      </HStack>
    </>
  );
}

export default Home;
