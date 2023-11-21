import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Movie } from "../../../../../../types/types";
import { useMutation } from "@apollo/client";
import {
  TOGGLE_FAVOURITE,
  GET_FAVOURITE_MOVIES,
} from "../../../../../../queries/queries";

type FavouriteButtonProps = {
  movie: Movie;
  isFavourite: boolean;
};

// FavouriteButton is a button that toggles between a filled and an empty star
const FavouriteButton = ({ movie, isFavourite }: FavouriteButtonProps) => {
  const [toggleFavourite] = useMutation(TOGGLE_FAVOURITE, {
    refetchQueries: [{ query: GET_FAVOURITE_MOVIES }],
  });

  // State to keep track of whether the button is active or not
  const [isActive, setIsActive] = useState(isFavourite);
  const [alertMessage, setAlertMessage] = useState("");

  const isLg = useBreakpointValue({
    base: false,
    lg: true,
  });

  // toggleFavorite toggles the state of the button
  const handleClick = async () => {
    if (isActive) {
      setAlertMessage(`"${movie.title}" removed from favourites`);
    } else {
      setAlertMessage(`"${movie.title}" added to favourites`);
    }
    setIsActive(!isActive);
    await toggleFavourite({
      variables: { movieid: movie.id },
    });
    setTimeout(() => {
      setAlertMessage("");
    }, 3000);
  };

  // Display a filled star if the button is active
  // else display an empty star
  return (
    <>
      {alertMessage && (
        <Alert
          status={isActive ? "success" : "error"}
          variant={"solid"}
          mb={4}
          borderRadius="md"
          position="fixed"
          top={0}
          left={0}
          width="100%"
          zIndex={9999}
        >
          <AlertIcon />
          <AlertTitle>{alertMessage}</AlertTitle>
        </Alert>
      )}
      <Button
        borderWidth={2}
        borderColor={isActive ? "gray.800" : "orange"}
        color={isActive ? "gray.800" : "orange"}
        bg={isActive ? "orange" : "gray.800"}
        variant="solid"
        onClick={handleClick}
        paddingX={2}
        _hover={{ bg: isActive ? "orange.400" : "gray.700" }}
      >
        {isActive ? <AiFillHeart /> : <AiOutlineHeart />}
        {isLg && (
          <Text paddingLeft={2}>
            {isActive ? "Favourited" : "Add to Favourites"}
          </Text>
        )}
      </Button>
    </>
  );
};

export default FavouriteButton;
