import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Image,
  Box,
  Text,
  Tag,
  Divider,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import UserVoteAverage from "../MovieCard/UserVoteAverage";
import { Genre, Movie } from "../../../types/types";
import FavouriteButton from "./FavouriteButton";
import Reviews from "../Reviews/Reviews";

interface MovieModalProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
  isFavourite: boolean;
}

// Compontent for modal when clicking on a movie card
const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  isOpen,
  onClose,
  isFavourite,
}) => {
  const poster_base_url = "https://image.tmdb.org/t/p/w500";
  const imageUrl = poster_base_url + movie.poster_path;

  const genreName = movie.genres.map((genre: Genre) => genre.name);

  const releaseDate = new Date(movie.release_date);
  const formattedDate = releaseDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Return the modal
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      size={["full", "lg", "xl", "5xl"]}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={"2xl"}>{movie.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingBottom={6} paddingTop={0}>
          <Flex direction={useBreakpointValue({ base: "column", md: "row" })}>
            <Image
              src={imageUrl}
              alt={movie.title}
              width={{ base: "100%", md: "40%" }}
              mx="auto"
              paddingBottom={useBreakpointValue({ base: 2, md: 0 })}
            />
            <Box pl={useBreakpointValue({ base: 0, md: 3 })} flexGrow={1}>
              <Flex justifyContent="space-between">
                {/* Map over the genres to display them as tags */}
                <Flex flexWrap="wrap">
                  {genreName.map((genreName, index) => (
                    <Tag key={index} mr={2} mb={1}>
                      <Text paddingX={1}>{genreName}</Text>
                    </Tag>
                  ))}
                </Flex>
                <Box>
                  <FavouriteButton movie={movie} isFavourite={isFavourite} />
                </Box>
              </Flex>

              <Text fontSize="md" color="gray.500">
                Release Date: {formattedDate}
              </Text>
              <Text py={2}>
                <UserVoteAverage vote_average={movie.vote_average} />
              </Text>

              <Flex id="textflex" flexDirection={"column"}>
                <Text fontSize="md">{movie.overview}</Text>
              </Flex>
            </Box>
          </Flex>

          <Divider py={2} borderColor={useColorModeValue("black", "white")} />
          <Reviews movie={movie} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MovieModal;
