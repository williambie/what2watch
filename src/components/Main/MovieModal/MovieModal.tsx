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
  Button,
  Input,
  Stack,
  Heading,
  Divider,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import genres from "../../../data/genres.json";
import { useState } from "react";
import UserVoteAverage from "../MovieCard/UserVoteAverage";
import { DeleteIcon } from "@chakra-ui/icons";
import { Movie } from "../../../types/types";

interface MovieModalProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
}

// Compontent for modal when clicking on a movie card
const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose }) => {
  const poster_base_url = "https://image.tmdb.org/t/p/w500";
  const imageUrl = poster_base_url + movie.poster_path;

  // Get the genre names for the movie
  const movieGenres = movie.genre_ids.map((genreId) =>
    genres.genres.find((genre) => genre.id === genreId),
  );

  // State for the review input
  const [review, setReview] = useState<string>("");
  const [submittedReviews, setSubmittedReviews] = useState<string[]>([]);

  // Function to handle submitting a review
  const handleSubmitReview = () => {
    if (review.trim() === "") {
      return;
    }
    // For demonstration purposes, we'll directly set the submitted review.
    // This will be stored in database later.
    setSubmittedReviews((prevReviews) => [...prevReviews, review]);

    // Clear the input
    setReview("");
  };

  // Function to handle deleting a review
  const handleDeleteReview = (index: number) => {
    setSubmittedReviews((prevReviews) => {
      const newReviews = [...prevReviews];
      newReviews.splice(index, 1); // Remove the review at the specified index
      return newReviews;
    });
  };

  const bg = useColorModeValue("gray.100", "gray.800");
  const reviewBg = useColorModeValue("gray.300", "gray.700");

  // Return the modal
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={["full", "sm", "lg", "xl", "5xl"]}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{movie.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={["column", "row"]}>
            <Image
              src={imageUrl}
              alt={movie.title}
              width={["100%", "30%"]}
              mx="auto"
              paddingBottom={2}
            />
            <Box ml="3">
              {/* Map over the genres to display them as tags */}
              {movieGenres.map((genre) => (
                <Tag key={genre?.id} mr={2} mb={3}>
                  {genre?.name}
                </Tag>
              ))}

              <Text mb="4">
                <UserVoteAverage vote_average={movie.vote_average} />
              </Text>

              <Text fontSize="md" mb={3}>
                {movie.overview}
              </Text>

              <Text fontSize="md" color="gray.500">
                Release Date: {movie.release_date}
              </Text>
            </Box>
          </Flex>
          <Stack spacing={4} bg={bg} padding={5} mt={3} borderRadius={20}>
            <Heading fontSize="lg">User Reviews</Heading>
            <Divider />
            <Input
              placeholder="Write your review here..."
              value={review} // Ensure the input's value is tied to the 'review' state
              onChange={(e) => setReview(e.target.value)}
            />
            <Stack direction={["column", "row"]} spacing={2}>
              <Button
                colorScheme="blue"
                variant="solid"
                onClick={handleSubmitReview}
                isDisabled={!review.trim()} // Disable the button if the input is empty
              >
                Add review
              </Button>
            </Stack>
            {/* Map over the submitted reviews to display them */}
            {submittedReviews.map((reviewText, index) => (
              <HStack
                key={index}
                bg={reviewBg}
                p={3}
                borderRadius="md"
                justifyContent={"space-between"}
              >
                <Text>{reviewText}</Text>
                <DeleteIcon
                  as={DeleteIcon}
                  cursor="pointer"
                  onClick={() => handleDeleteReview(index)}
                />
              </HStack>
            ))}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MovieModal;
