import {
  Card,
  CardBody,
  HStack,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";

const LoadingCard = () => {
  const bg = useColorModeValue("gray.300", "gray.700");

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
