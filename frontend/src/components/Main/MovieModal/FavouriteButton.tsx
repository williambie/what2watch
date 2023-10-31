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
import { Movie } from "../../../types/types";
import { useMutation } from "@apollo/client";
import {
  TOGGLE_FAVOURITE,
  GET_USER,
  ADD_FAVOURITE,
  REMOVE_FAVOURITE,
} from "../../../queries/queries";
import { useQuery } from "@apollo/client";

type FavouriteButtonProps = {
  movie: Movie;
  isFavourite: boolean;
};

// FavouriteButton is a button that toggles between a filled and an empty star
const FavouriteButton = ({ movie, isFavourite }: FavouriteButtonProps) => {
  const [toggleFavourite] = useMutation(TOGGLE_FAVOURITE, {
    variables: { movieid: movie.id },
  });
  const { loading, data } = useQuery(GET_USER);

  const [isActive, setIsActive] = useState(isFavourite);
  const [alertMessage, setAlertMessage] = useState("");
  const [addFavourite] = useMutation(ADD_FAVOURITE);
  const [removeFavourite] = useMutation(REMOVE_FAVOURITE);

  const isLg = useBreakpointValue({
    base: false,
    lg: true,
  });

  // toggleFavorite toggles the state of the button
  const handleClick = async () => {
    setIsActive(!isActive);
    try {
      if (isActive && data?.user) {
        setAlertMessage(`"${movie.title}" removed from favourites`);
        await toggleFavourite();
        await removeFavourite({
          variables: { movieid: movie.id, userid: data.user.id },
        });
      } else {
        setAlertMessage(`"${movie.title}" added to favourites`);
        await toggleFavourite();
        await addFavourite({
          variables: { movieid: movie.id, userid: data.user.id },
        });
      }
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setAlertMessage("");
    }, 4000);
  };

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
      {!loading && (
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
      )}
    </>
  );
};

export default FavouriteButton;
