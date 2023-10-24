import { Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import { useState } from "react";
import { Movie } from "../../../types/types";
import FavouriteButton from "./FavouriteButton";
import MovieModal from "../MovieModal/MovieModal";
import UserVoteAverage from "./UserVoteAverage";

interface Props {
  movie: Movie;
}

// MovieCard is a card that displays a movie's title, poster and vote average
const MovieCard = ({ movie }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  // The card is displayed on the main page and is clickable
  return (
    <>
      <Card
        borderRadius={10}
        overflow="hidden"
        onClick={onOpen}
        position="relative"
        _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
        transition="transform 0.2s ease-in-out"
      >
        <Image src={imageUrl} alt={movie.title} />
        <CardBody>
          <HStack justifyContent="space-between">
            <Heading fontSize="2xl">{movie.title}</Heading>
            <UserVoteAverage vote_average={movie.vote_average} />
          </HStack>
        </CardBody>
        <FavouriteButton />
      </Card>

      {/* The modal is displayed when the card is clicked */}
      <MovieModal movie={movie} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default MovieCard;
