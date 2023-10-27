import { Box, HStack } from "@chakra-ui/react";
import MovieGrid from "./MovieGrid/MovieGrid";
import Paginator from "./Paginator";
import GenreFilter from "./SortingFiltering/GenreFilter";
import SortingButton from "./SortingFiltering/SortingButton";
import movies from "../../data/movies.json";
import { useState } from "react";
import SearchFilter from "./SortingFiltering/SearchFilter";

export interface MovieQuery {
  genre: number | null;
  sortBy: string;
}

interface HomeProps {
  searchTerm: string;
}

// Home is the main page of the application
function Home({ searchTerm }: HomeProps) {
  const [movieQuery, setMovieQuery] = useState<MovieQuery>({
    genre: null,
    sortBy: "popularity",
  });

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
          />
        )}
      </Box>
      <HStack justifyContent="space-evenly">
        <Paginator />
      </HStack>
    </>
  );
}

export default Home;