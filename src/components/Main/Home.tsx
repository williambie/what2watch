import { Box, HStack } from "@chakra-ui/react";
import { MovieGrid } from "./MovieGrid/MovieGrid";
import Paginator from "./Paginator";
import GenreFilter from "./SortingFiltering/GenreFilter";
import SortingButton from "./SortingFiltering/SortingButton";
import movies from "../../data/movies.json";

const Home = () => {
  return (
    <>
      <HStack paddingLeft="30px">
        <GenreFilter />
        <SortingButton />
      </HStack>
      <Box padding="5">
        <MovieGrid movies={movies} />
      </Box>
      <HStack justifyContent="space-evenly">
        <Paginator />
      </HStack>
    </>
  );
};

export default Home;
