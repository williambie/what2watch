import { Movie } from "../../../types/types";
import { SimpleGrid } from "@chakra-ui/react";
import MovieCard from "../MovieCard/MovieCard";

interface Props {
  searchTerm: string;
  movies: Movie[];
}

const SearchFilter = ({ movies, searchTerm }: Props) => {
  // Filter by search term
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

export default SearchFilter;
