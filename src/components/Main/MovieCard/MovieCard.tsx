import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";
import { MovieCardProps } from "../../../Types";
import UserVoteAverage from "./UserVoteAverage";
import { Link } from "react-router-dom";

const poster_base_url = "https://image.tmdb.org/t/p/w300";

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => (
  <Link to={`/movie/${movie.id}`}>
    <Card borderRadius={10} overflow="hidden">
      <Image src={poster_base_url + movie.poster_path} alt={movie.title} />
      <CardBody>
        <HStack justifyContent="space-between">
          <Heading fontSize="2xl">{movie.title}</Heading>
          <UserVoteAverage vote_average={movie.vote_average} />
        </HStack>
      </CardBody>
    </Card>
  </Link>
);

export default MovieCard;
