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
  Heading,
} from "@chakra-ui/react";
import UserVoteAverage from "../UserVoteAverage/UserVoteAverage";
import { Genre, Movie } from "../../../../../types/types";
import FavouriteButton from "./FavouriteButton";
import Reviews from "./Reviews/Reviews";

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
          {/* display cast */}
          <Heading mt={4} fontSize={"2xl"}>
            Cast
          </Heading>
          <Box mt={6} mb={3}>
            <Flex overflowX="auto" my={4}>
              {movie.cast.map((cast, index) => (
                <Box
                  key={index}
                  flex="none"
                  mx={2}
                  textAlign="center"
                  mb={3}
                  minWidth="120px" // Ensure each box has a minimum width.
                  maxWidth="120px" // Ensure text doesn't overflow the max width.
                >
                  {cast.profile_path ? (
                    <Image
                      src={poster_base_url + cast.profile_path}
                      alt={cast.name}
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="full"
                      mx="auto"
                    />
                  ) : (
                    <Image
                      borderRadius={"full"}
                      src="https://placehold.co/100x100/000000/FFFFFF?text=No+Image"
                    />
                  )}
                  <Text mt={2} fontSize="sm">
                    {cast.name}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    style={{ wordBreak: "break-word" }}
                  >
                    as {cast.character}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Box>
          <Divider py={2} borderColor={useColorModeValue("black", "white")} />
          <Reviews movie={movie} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MovieModal;
