import {
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { Movie } from "../../../Types";
import UserVoteAverage from "./UserVoteAverage";
import MovieModal from "../MovieModal/MovieModal";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => (
  const { isOpen, onOpen, onClose } = useDisclosure();
  const poster_base_url = "https://image.tmdb.org/t/p/w500";
  const imageUrl = poster_base_url + movie.poster_path;

  return (
    <>
      <Card borderRadius={10} overflow="hidden" onClick={onOpen}>
        <Image src={imageUrl} alt={movie.title} />
        <CardBody>
          <HStack justifyContent="space-between">
            <Heading fontSize="2xl">{movie.title}</Heading>
            <UserVoteAverage vote_average={movie.vote_average} />
          </HStack>
        </CardBody>
      </Card>

      <MovieModal movie={movie} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default MovieCard;
