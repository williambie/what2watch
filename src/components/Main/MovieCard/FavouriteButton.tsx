import { Button, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// FavouriteButton is a button that toggles between a filled and an empty star
const FavouriteButton = () => {
  const [isActive, setIsActive] = useState(false);
  // toggleFavorite toggles the state of the button
  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsActive(!isActive);
    e.stopPropagation();
  };

  const buttonColor = useColorModeValue("gray.100", "gray.800");
  // The button is a star icon that is either filled or empty
  return (
    <Button
      border={1}
      color="orange"
      bg={buttonColor}
      borderColor="black"
      position="absolute"
      right={2}
      top={2}
      variant="solid"
      onClick={toggleFavorite}
      size="md"
      width="40px"
      padding={0}
    >
      {isActive ? <AiFillStar size={30} /> : <AiOutlineStar size={30} />}
    </Button>
  );
};

export default FavouriteButton;
