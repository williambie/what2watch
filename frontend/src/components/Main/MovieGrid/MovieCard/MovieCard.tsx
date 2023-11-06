import {
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Movie } from "../../../../types/types";
import MovieModal from "./MovieModal/MovieModal";
import UserVoteAverage from "./UserVoteAverage/UserVoteAverage";
import { useQuery } from "@apollo/client";
import { CHECK_FAVOURITE } from "../../../../queries/queries";

interface Props {
  movie: Movie;
}

// MovieCard is a card that displays a movie's title, poster and vote average
const MovieCard = ({ movie }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const bg = useColorModeValue("gray.300", "gray.700");

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const { refetch } = useQuery(CHECK_FAVOURITE, {
    variables: { movieid: movie.id },
    skip: true,
  });
  const [isFavourite, setIsFavourite] = useState(false);

  const onOpen = () => {
    refetch().then(({ data }) => {
      setIsFavourite(data.checkFavourite);
      setIsOpen(true);
    });
  };

  const onClose = () => {
    setIsOpen(false);
  };

  // The card is displayed on the main page and is clickable
  return (
    <>
      <Card
        bg={bg}
        borderRadius={10}
        overflow="hidden"
        onClick={onOpen}
        position="relative"
        _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
        transition="transform 0.2s ease-in-out"
      >
        <Image src={imageUrl} alt={movie.title} />
        <CardBody>
          <HStack justifyContent="space-between" flex={1}>
            <Heading fontSize={{ base: "md", md: "lg" }}>{movie.title}</Heading>
            <UserVoteAverage vote_average={movie.vote_average} />
          </HStack>
        </CardBody>
      </Card>

      {/* The modal is displayed when the card is clicked */}
      <MovieModal
        movie={movie}
        isOpen={isOpen}
        onClose={onClose}
        isFavourite={isFavourite}
      />
    </>
  );
};

export default MovieCard;
