import { SimpleGrid } from "@chakra-ui/react";
import MovieCard from "../MovieCard/MovieCard";
import { Movie } from "../../../types/types";

interface Props {
  genre?: number | null;
  sortBy?: string;
  movies: Movie[];
}

// MovieGrid is a grid that displays all movies
const MovieGrid = ({ movies, genre, sortBy }: Props) => {
  const filteredMovies = genre
    ? movies.filter((movie) => movie.genre_ids.includes(genre))
    : movies;

  // Sorts movies by vote average, title or popularity
  const sortMovies = (movies: Movie[], sortBy: string) => {
    const moviesCopy = [...movies];

    return moviesCopy.sort((a: Movie, b: Movie) => {
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

  const sortedMovies = sortBy
    ? sortMovies(filteredMovies, sortBy)
    : filteredMovies;

  // The grid is displayed on the main page
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5, "2xl": 6 }}
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
