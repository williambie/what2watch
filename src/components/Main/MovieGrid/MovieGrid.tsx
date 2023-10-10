import { SimpleGrid } from "@chakra-ui/react";
import { MovieGridProps } from "../../../Types";
import { MovieCard } from "../MovieCard/MovieCard";

export const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing="10">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </SimpleGrid>
  );