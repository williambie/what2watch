import { Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import { useState } from "react";
import { Movie } from "../../../types/types";
import FavouriteButton from "./FavouriteButton";
import MovieModal from "../MovieModal/MovieModal";
import UserVoteAverage from "./UserVoteAverage";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Card
        borderRadius={10}
        overflow="hidden"
        onClick={onOpen}
        position="relative"
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

      <MovieModal movie={movie} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default MovieCard;
