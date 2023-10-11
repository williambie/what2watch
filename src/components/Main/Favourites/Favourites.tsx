import { Heading, Box } from "@chakra-ui/react";
import MovieGrid from "../MovieGrid/MovieGrid";
import movies from "../../../data/movies.json";

// Simple rendering of all movies to show how it will be displayed when done
const Favourites = () => {
  return (
    <>
      <Heading paddingLeft="30px">My Favourite Movies</Heading>
      <Box padding="5">
        <MovieGrid movies={movies} />
      </Box>
    </>
  );
};

export default Favourites;
