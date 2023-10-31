import { SimpleGrid } from "@chakra-ui/react";
import MovieCard from "../MovieCard/MovieCard";
import { Movie } from "../../../types/types";
import LoadingCard from "../LoadingCard/LoadingCard";

interface Props {
  movies: Movie[];
  loading: boolean;
}

// MovieGrid is a grid that displays all movies
const MovieGrid = ({ movies, loading }: Props) => {

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5, "2xl": 6 }}
      padding="10px"
      spacing={10}
    >
      {loading
        ? Array(15)
            .fill(0)
            .map((_, idx) => <LoadingCard key={idx} />)
        : movies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
    </SimpleGrid>
  );
};

export default MovieGrid;
