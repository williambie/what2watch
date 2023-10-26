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

type FavouriteButtonProps = {
  movieName: string;
};

// FavouriteButton is a button that toggles between a filled and an empty star
const FavouriteButton = ({ movieName }: FavouriteButtonProps) => {
  const [isActive, setIsActive] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // toggleFavorite toggles the state of the button
  const toggleFavorite = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setAlertMessage(`"${movieName}" added to favourites`);
    } else {
      setAlertMessage(`"${movieName}" removed from favourites`);
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
      <Button
        borderWidth={2}
        borderColor={isActive ? "gray.800" : "orange"}
        color={isActive ? "gray.800" : "orange"}
        bg={isActive ? "orange" : "gray.800"}
        variant="solid"
        onClick={toggleFavorite}
        paddingX={2}
        _hover={{ bg: isActive ? "orange.400" : "gray.700" }}
      >
        {isActive ? <AiFillHeart /> : <AiOutlineHeart />}
        {useBreakpointValue({
          base: null,
          lg: (
            <Text paddingLeft={2}>
              {isActive ? "Favourited" : "Add to Favourites"}
            </Text>
          ),
        })}
      </Button>
    </>
  );
};

export default FavouriteButton;
