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
import { useEffect, useRef } from "react";

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
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  const poster_base_url = "https://image.tmdb.org/t/p/w500";
  const imageUrl = poster_base_url + movie.poster_path;

  const genreName = movie.genres.map((genre: Genre) => genre.name);

  const releaseDate = new Date(movie.release_date);
  const formattedDate = releaseDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Chakra UI color mode values
  const trackColor = useColorModeValue("#f1f1f1", "#bfbfbf");
  const thumbColor = useColorModeValue("#888", "#707070");
  const thumbHoverColor = useColorModeValue("#555", "#4d4d4d");

  useEffect(() => {
    if (isOpen && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, [isOpen]);

  // Return the modal component to display the movie details when the user clicks on a movie card
  // The modal displays the movie poster, title, genres, release date, vote average, overview, cast and reviews
  return (
    <Modal
      initialFocusRef={initialFocusRef}
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      aria-modal="true"
      size={["full", "lg", "xl", "5xl"]}
    >
      <ModalOverlay />
      <ModalContent
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-header"
      >
        <ModalHeader fontSize={"2xl"} id="modal-header">
          {movie.title}
        </ModalHeader>
        <ModalCloseButton
          ref={initialFocusRef}
          aria-label="Close movie details"
        />
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
                  <FavouriteButton
                    movie={movie}
                    isFavourite={isFavourite}
                    aria-label={
                      isFavourite
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                  />
                </Box>
              </Flex>

              <Text
                fontSize="md"
                color="gray.400"
                aria-label="Show release date details"
              >
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
          <Box
            mt={6}
            mb={3}
            role="region"
            aria-labelledby="cast-heading"
            tabIndex={0}
          >
            <Flex
              overflowX="auto"
              my={4}
              css={{
                "&::-webkit-scrollbar": {
                  width: "10px",
                },
                "&::-webkit-scrollbar-track": {
                  background: trackColor,
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: thumbColor,
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: thumbHoverColor,
                },
              }}
            >
              {movie.cast.map((cast, index) => (
                <Box
                  key={index}
                  flex="none"
                  mx={2}
                  textAlign="center"
                  mb={3}
                  minWidth="120px"
                  maxWidth="120px"
                  role="region"
                  aria-label="Cast Display"
                  tabIndex={0}
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
                      alt={cast.name}
                    />
                  )}
                  <Text mt={2} fontSize="sm">
                    {cast.name}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="gray.400"
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
