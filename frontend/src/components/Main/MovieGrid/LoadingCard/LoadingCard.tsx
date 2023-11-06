import {
  Card,
  CardBody,
  HStack,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";

// LoadingCard component is used to display a loading card when the user is waiting for the movies to load
// Using chakra ui's Skeleton component to display a loading card

const LoadingCard = () => {
  const bg = useColorModeValue("gray.300", "gray.700");

  // Display a loading card with a skeleton animation
  // in the same format as the MovieCard component but with no data
  return (
    <Card
      bg={bg}
      borderRadius={10}
      overflow="hidden"
      position="relative"
      transition="transform 0.2s ease-in-out"
    >
      <Skeleton
        height="330px"
        width="100%"
        startColor={bg}
        endColor="gray.400"
      />

      <CardBody>
        <HStack justifyContent="space-between" flex={1}>
          <Skeleton
            height="20px"
            width="60%"
            startColor={bg}
            endColor="gray.400"
          />
          <Skeleton
            height="20px"
            width="30%"
            startColor={bg}
            endColor="gray.400"
          />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default LoadingCard;
