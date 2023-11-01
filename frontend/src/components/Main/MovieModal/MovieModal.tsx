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
  Spinner,
} from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import UserVoteAverage from "../MovieCard/UserVoteAverage";
import { DeleteIcon } from "@chakra-ui/icons";
import { Genre, Movie, Review } from "../../../types/types";
import FavouriteButton from "./FavouriteButton";
import { StarIcon } from "@chakra-ui/icons";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER, ADD_REVIEW, DELETE_REVIEW } from "../../../queries/queries";

interface MovieModalProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
}

// Compontent for modal when clicking on a movie card
const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose }) => {
  const poster_base_url = "https://image.tmdb.org/t/p/w500";
  const imageUrl = poster_base_url + movie.poster_path;
  const [hoverIndex, setHoverIndex] = useState(-1);
  const { loading: userLoading, data: userData } = useQuery(GET_USER);

  const genreName = movie.genres.map((genre: Genre) => genre.name);

  const [isRefetching, setIsRefetching] = useState(false);

  const [addReview] = useMutation(ADD_REVIEW);
  const [deleteReview] = useMutation(DELETE_REVIEW);

  // State for the review input
  const [review, setReview] = useState<string>("");
  const [starRating, setStarRating] = useState<number>(0);

  const textColor = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("black", "white");
  const bgColor = useColorModeValue("gray.100", "gray.600");
  const bg = useColorModeValue("gray.300", "gray.700");

  const handleStarClick = (rating: number) => {
    setStarRating(rating);
  };

  // Function to handle submitting a review
  const handleSubmitReview = async () => {
    if (review.trim() === "") {
      return;
    }

    setIsRefetching(true);

    const now = new Date();
    const options = {
      year: "numeric" as const,
      month: "long" as const,
      day: "numeric" as const,
      hour: "numeric" as const,
      minute: "numeric" as const,
    };
    const timestamp = now.toLocaleString("en-US", options);

    try {
      // Call the addReview mutation with the review data
      await addReview({
        variables: {
          content: review,
          rating: starRating,
          timestamp: timestamp,
          movieid: movie.id,
          userid: userData?.user.id,
        },
      });

      // Reset the form state
      setReview("");
      setStarRating(0);
    } catch (error) {
      console.log(error);
    } finally {
      // Set the isRefetching state to false to hide the spinner
      setIsRefetching(false);
    }
  };

  // Function to handle deleting a review
  const handleDeleteReview = async (id: number) => {
    setIsRefetching(true);

    try {
      // Call the deleteReview mutation with the review id
      await deleteReview({
        variables: {
          id: id,
        },
      });

      // Set the isRefetching state to true to show the spinner

      // Refetch the reviews
    } catch (error) {
      console.log(error);
    } finally {
      // Set the isRefetching state to false to hide the spinner
      setIsRefetching(false);
    }
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
                    isFavourite={movie.favourite}
                  />
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
          <Stack
            spacing={4}
            bg={useColorModeValue("gray.200", "gray.800")}
            padding={5}
            mt={3}
            borderRadius={5}
          >
            <Heading fontSize="lg">
              User Reviews
              {isRefetching && <Spinner size="sm" ml={2} />}
            </Heading>
            <Divider borderColor={useColorModeValue("black", "white")} />
            {!movie.reviews ? (
              <Spinner />
            ) : (
              <>
                {movie.reviews.length === 0 ? (
                  <Text padding={2}>Be the first to review this movie!</Text>
                ) : (
                  movie.reviews.map((review: Review, index: number) => (
                    <Flex
                      flexDirection={"column"}
                      key={index}
                      bg={bg}
                      p={3}
                      borderRadius="md"
                    >
                      <HStack justifyContent={"space-between"}>
                        <HStack>
                          <Avatar size="xs"></Avatar>
                          {userLoading ? (
                            <Text>Fetching user...</Text>
                          ) : (
                            <Text>{userData.user.username}</Text>
                          )}
                        </HStack>
                        <Text color={textColor}>{review.timestamp}</Text>
                      </HStack>
                      <Divider paddingBottom={2} borderColor={borderColor} />

                      <HStack
                        marginTop={1}
                        padding={1}
                        bgColor={bgColor}
                        width={"min-content"}
                        borderRadius={"5px"}
                      >
                        {[...Array(review.rating)].map((_, i) => (
                          <StarIcon
                            key={i}
                            color={"yellow.400"}
                            fontSize={12}
                          />
                        ))}
                      </HStack>

                      <HStack justifyContent={"space-between"} paddingTop={2}>
                        <Text>{review.content}</Text>
                        <Button
                          cursor="pointer"
                          size={"xs"}
                          bg={"red.600"}
                          onClick={() => handleDeleteReview(review.id)}
                        >
                          <DeleteIcon color={"white"} />
                        </Button>
                      </HStack>
                    </Flex>
                  ),
                  )
                )}
              </>
            )}
            <Divider borderColor={useColorModeValue("black", "white")} />
            <HStack>
              <Avatar size="sm"></Avatar>
              <Input
                placeholder="Write your review here..."
                value={review} // Ensure the input's value is tied to the 'review' state
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setReview(e.target.value)
                }
                borderColor="gray.500"
              />
            </HStack>

            <HStack
              padding={2}
              width={"min-content"}
              border={"solid 1px"}
              borderColor={useColorModeValue("gray.500", "gray.400")}
              borderRadius={"20px"}
              bgColor={useColorModeValue("gray.300", "gray.600")}
            >
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  color={
                    i <= hoverIndex
                      ? "orange.500"
                      : i <= starRating - 1
                      ? "yellow.400"
                      : "gray.500"
                  }
                  onClick={() => handleStarClick(i + 1)}
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(-1)}
                  _hover={{ cursor: "pointer" }}
                />
              ))}
            </HStack>
            <Stack direction={["column", "row"]} spacing={2}>
              <Button
                bgColor="green"
                variant="solid"
                onClick={handleSubmitReview}
                isDisabled={!review.trim() || starRating == 0} // Disable the button if the input is empty or no star rating is selected
                _hover={{ bg: "green.500" }}
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
