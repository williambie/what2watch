import { StarIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  useColorModeValue,
  Stack,
  Heading,
  Spinner,
  Divider,
  Flex,
  HStack,
  Avatar,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState, SetStateAction } from "react";
import {
  ADD_REVIEW,
  DELETE_REVIEW,
  GET_USER,
  GET_REVIEWS,
} from "../../../../../../queries/queries";
import { Movie, Review } from "../../../../../../types/types";
import { useQuery, useMutation } from "@apollo/client";

interface ReviewProps {
  movie: Movie;
}

// Reviews component is used to display the reviews for a movie
// It also allows the user to add a review for a movie and delete their own reviews
const Reviews: React.FC<ReviewProps> = ({ movie }) => {
  // State to keep track of the index of the star that is being hovered over
  const [hoverIndex, setHoverIndex] = useState(-1);
  const { loading: userLoading, data: userData } = useQuery(GET_USER);

  // State to keep track of whether the reviews are being refetched
  const [isRefetching, setIsRefetching] = useState(false);
  // Mutation to add and delte a review
  const [addReview] = useMutation(ADD_REVIEW);
  const [deleteReview] = useMutation(DELETE_REVIEW);

  // State to keep track of the review content and star rating
  const [review, setReview] = useState<string>("");
  const [starRating, setStarRating] = useState<number>(0);

  // Chakra UI color mode values
  const textColor = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("black", "white");
  const bgColor = useColorModeValue("gray.100", "gray.600");
  const bg = useColorModeValue("gray.300", "gray.700");

  // Query to get the reviews for a movie
  const { loading: reviewsLoading, data: reviewsData } = useQuery(GET_REVIEWS, {
    variables: { id: movie.id },
  });

  // Function to handle clicking on a star
  const handleStarClick = (rating: number) => {
    setStarRating(rating);
  };

  const handleStarKeyDown = (event: { key: string }, rating: number) => {
    if (event.key === "Enter" || event.key === " ") {
      // ' ' is the Spacebar key
      handleStarClick(rating);
    }
  };

  // Function to handle submitting a review
  const handleSubmitReview = async () => {
    if (review.trim() === "") {
      return;
    }

    setIsRefetching(true);

    // Get the current date and time
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
        refetchQueries: [
          {
            query: GET_REVIEWS,
            variables: { id: movie.id },
          },
        ],
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
        refetchQueries: [
          {
            query: GET_REVIEWS,
            variables: { id: movie.id },
          },
        ],
      });

      // Refetch the reviews
    } catch (error) {
      console.log(error);
    } finally {
      // Set the isRefetching state to false to hide the spinner
      setIsRefetching(false);
    }
  };

  // Display a spinner if the reviews are being refetched
  // Display a message if there are no reviews for the movie
  // else display the reviews for the movie
  return (
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
      {!reviewsData ? (
        reviewsLoading ? (
          <Spinner />
        ) : (
          <Text padding={2}>Be the first to review this movie!</Text>
        )
      ) : (
        <>
          {reviewsData.movie.reviews.length === 0 ? (
            <Text padding={2}>Be the first to review this movie!</Text>
          ) : (
            reviewsData.movie.reviews.map((review: Review, index: number) => (
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
                    <StarIcon key={i} color={"yellow.400"} fontSize={12} />
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
            ))
          )}
        </>
      )}
      <Divider borderColor={useColorModeValue("black", "white")} />
      <HStack>
        <Avatar size="sm"></Avatar>
        <Input
          placeholder="Write your review here..."
          value={review}
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
            onKeyDown={(e) => handleStarKeyDown(e, i + 1)}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(-1)}
            tabIndex={0}
            aria-label={`${i + 1} star rating`}
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
          aria-label={`Submit review for ${movie.title}`}
        >
          Add review
        </Button>
      </Stack>
    </Stack>
  );
};

export default Reviews;
