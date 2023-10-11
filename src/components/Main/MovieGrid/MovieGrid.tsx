import { SimpleGrid } from "@chakra-ui/react";
import MovieCard from "../MovieCard/MovieCard";
import { Movie } from "../../../Types";

interface Props {
  genre: number | null;
  movies: Movie[];
}

const MovieGrid = ({ movies, genre }: Props) => {
  const filteredMovies = genre
    ? movies.filter((movie) => movie.genre_ids.includes(genre))
    : movies;

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      padding="10px"
      spacing={10}
    >
      {filteredMovies.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </SimpleGrid>
  );
};

export default MovieGrid;
