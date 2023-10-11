import { SimpleGrid } from "@chakra-ui/react";
import MovieCard from "../MovieCard/MovieCard";
import { Movie } from "../../../types/types";

interface Props {
  genre?: number | null;
  sortBy?: string;
  movies: Movie[];
}

const MovieGrid = ({ movies, genre, sortBy }: Props) => {
  const filteredMovies = genre
    ? movies.filter((movie) => movie.genre_ids.includes(genre))
    : movies;

  const sortMovies = (movies: Movie[], sortBy: string) => {
    return movies.sort((a: Movie, b: Movie) => {
      if (sortBy === "vote_average") {
        return b.vote_average - a.vote_average;
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "popularity") {
        return b.popularity - a.popularity;
      }
      return 0;
    });
  };

  const sortedMovies = sortBy ? sortMovies(filteredMovies, sortBy) : filteredMovies;

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      padding="10px"
      spacing={10}
    >
      {sortedMovies.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </SimpleGrid>
  );
};

export default MovieGrid;
