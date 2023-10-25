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
  useBreakpointValue,
  Avatar,
} from "@chakra-ui/react";
import genres from "../../../data/genres.json";
import { useState } from "react";
import UserVoteAverage from "../MovieCard/UserVoteAverage";
import { DeleteIcon } from "@chakra-ui/icons";
import { Movie } from "../../../types/types";
import FavouriteButton from "./FavouriteButton";
import { StarIcon } from "@chakra-ui/icons";

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
  const [submittedReviews, setSubmittedReviews] = useState<
    {
      author: string;
      content: string;
      created_at: string;
      star_rating: number;
    }[]
  >([]);
  const [starRating, setStarRating] = useState<number>(0);

  const handleStarClick = (rating: number) => {
    setStarRating(rating);
  };

  // Function to handle submitting a review
  const handleSubmitReview = () => {
    if (review.trim() === "") {
      return;
    }
    const now = new Date();
    const options = {
      year: "numeric" as const,
      month: "long" as const,
      day: "numeric" as const,
      hour: "numeric" as const,
      minute: "numeric" as const,
    };
    const timestamp = now.toLocaleString("en-US", options);
    const newReview = {
      author: "Martha",
      content: review,
      created_at: timestamp,
      star_rating: starRating,
    };

    setSubmittedReviews([...submittedReviews, newReview]);
    setReview("");
    setStarRating(0);
  };

  // Function to handle deleting a review
  const handleDeleteReview = (index: number) => {
    const newReviews = [...submittedReviews];
    newReviews.splice(index, 1);
    setSubmittedReviews(newReviews);
  };

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
        setStarRating(0);
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
                <Box>
                  {movieGenres.map((genre) => (
                    <Tag key={genre?.id} mr={2}>
                      <Text paddingX={1}>{genre?.name}</Text>
                    </Tag>
                  ))}
                </Box>
                <FavouriteButton />
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
          <Stack
            spacing={4}
            bg={useColorModeValue("gray.200", "gray.800")}
            padding={5}
            mt={3}
            borderRadius={5}
          >
            <Heading fontSize="lg">User Reviews</Heading>
            <Divider borderColor={useColorModeValue("black", "white")} />
            {submittedReviews.map((review, index) => (
              <Flex
                flexDirection={"column"}
                key={index}
                bg={useColorModeValue("gray.300", "gray.700")}
                p={3}
                borderRadius="md"
              >
                <HStack justifyContent={"space-between"}>
                  <HStack>
                    <Avatar size="xs"></Avatar>
                    <Text>{review.author}</Text>
                  </HStack>
                  <Text color={useColorModeValue("gray.600", "gray.400")}>
                    {review.created_at}
                  </Text>
                </HStack>
                <Divider
                  paddingBottom={2}
                  borderColor={useColorModeValue("black", "white")}
                />

                <HStack
                  marginTop={1}
                  padding={1}
                  bgColor={"white"}
                  width={"min-content"}
                  borderRadius={"20px"}
                >
                  {[...Array(review.star_rating)].map((_, i) => (
                    <StarIcon key={i} color={"yellow.400"} fontSize={12} />
                  ))}
                </HStack>

                <HStack justifyContent={"space-between"} paddingTop={2}>
                  <Text>{review.content}</Text>
                  <Button
                    cursor="pointer"
                    size={"xs"}
                    bg={"red.600"}
                    onClick={() => handleDeleteReview(index)}
                  >
                    <DeleteIcon color={"white"} />
                  </Button>
                </HStack>
              </Flex>
            ))}
            <Divider borderColor={useColorModeValue("black", "white")} />

            <Input
              placeholder="Write your review here..."
              value={review} // Ensure the input's value is tied to the 'review' state
              onChange={(e) => setReview(e.target.value)}
              borderColor="gray.500"
            />

            <HStack
              padding={2}
              width={"min-content"}
              border={"solid 1px"}
              borderRadius={"20px"}
            >
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < starRating ? "yellow.400" : "gray.500"}
                  onClick={() => handleStarClick(i + 1)}
                  _hover={{ color: "green.400", cursor: "pointer" }}
                />
              ))}
            </HStack>
            <Stack direction={["column", "row"]} spacing={2}>
              <Button
                bgColor="green"
                variant="solid"
                onClick={handleSubmitReview}
                isDisabled={!review.trim() || starRating == 0} // Disable the button if the input is empty or no star rating is selected
              >
                Add review
              </Button>
            </Stack>
            {/* Map over the submitted reviews to display them */}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MovieModal;
