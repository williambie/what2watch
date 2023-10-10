import { SimpleGrid } from "@chakra-ui/react";
import { MovieGridProps } from "../../../Types";
import MovieCard from "../MovieCard/MovieCard";

export const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => (
  <SimpleGrid
    columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
    padding="10px"
    spacing={10}
  >
    {movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </SimpleGrid>
);