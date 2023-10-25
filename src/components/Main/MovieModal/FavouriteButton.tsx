import { Button, Text, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// FavouriteButton is a button that toggles between a filled and an empty star
const FavouriteButton = () => {
  const [isActive, setIsActive] = useState(false);
  // toggleFavorite toggles the state of the button
  const toggleFavorite = () => {
    setIsActive(!isActive);
  };

  return (
    <Button
      borderWidth={2}
      borderColor={isActive ? "gray.800" : "orange"}
      color={isActive ? "gray.800" : "orange"}
      bg={isActive ? "orange" : "gray.800"}
      variant="solid"
      onClick={toggleFavorite}
      paddingX={2}
    >
      {isActive ? <AiFillHeart /> : <AiOutlineHeart />}
      {useBreakpointValue({ base: null, lg: <Text paddingLeft={2}>{isActive ? "Favourited" : "Add to Favourites"}</Text> })}
    </Button>
  );
};

export default FavouriteButton;
