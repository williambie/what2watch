import { SimpleGrid } from "@chakra-ui/react";
import MovieCard from "./MovieCard/MovieCard";
import { Movie } from "../../../types/types";

interface Props {
  movies: Movie[];
}

// MovieGrid is a grid that displays all movies in a grid format using the MovieCard component
const MovieGrid = ({ movies }: Props) => {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5, "2xl": 6 }}
      padding="10px"
      spacing={10}
    >
      {movies.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </SimpleGrid>
  );
};

export default MovieGrid;
