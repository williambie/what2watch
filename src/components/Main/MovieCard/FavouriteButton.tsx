import { Button, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface Props {
  movieId: number;
  onToggle: (movieId: number) => void;
}

const FavouriteButton = ({ movieId, onToggle }: Props) => {
  const [isActive, setIsActive] = useState(false);

  const toggleFavorite = () => {
    setIsActive(!isActive);
    onToggle(movieId);
  };

  const buttonColor = useColorModeValue("gray.100", "gray.800");
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
      {isActive ? <AiFillStar size={30}/> : <AiOutlineStar size={30}/>}
    </Button>
  );
};

export default FavouriteButton;
