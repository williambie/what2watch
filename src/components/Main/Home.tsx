import { Box, HStack } from "@chakra-ui/react";
import MovieGrid from "./MovieGrid/MovieGrid";
import Paginator from "./Paginator";
import GenreFilter from "./SortingFiltering/GenreFilter";
import SortingButton from "./SortingFiltering/SortingButton";
import movies from "../../data/movies.json";
import { useState } from "react";

export interface MovieQuery {
  genre: number | null;
} 

function Home() {

  const [movieQuery, setMovieQuery] = useState<MovieQuery>({
    genre: null
  });

  return (
    <>
      <HStack paddingLeft="30px">
        <GenreFilter onSelectGenre={(genre) => setMovieQuery({...movieQuery, genre})} />
        <SortingButton />
      </HStack>
      <Box padding="5">
        <MovieGrid genre={movieQuery.genre} movies={movies} />
      </Box>
      <HStack justifyContent="space-evenly">
        <Paginator />
      </HStack>
    </>
  );
};

export default Home;
