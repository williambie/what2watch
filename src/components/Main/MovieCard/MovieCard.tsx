import { Box, Image, Text } from "@chakra-ui/react";
import { MovieCardProps } from "../../../Types";

const poster_base_url = "https://image.tmdb.org/t/p/w300";
export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => (
  <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
    <Image src={poster_base_url + movie.poster_path} alt={movie.title} />
    <Box p="6">
      <Text fontWeight="bold" fontSize="xl" mb="2">
        {movie.title}
      </Text>
    </Box>
  </Box>
);