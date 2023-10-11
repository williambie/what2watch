import { Button, HStack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

// Paginator is a component that allows the user to navigate between pages of movies (Not functional yet)
const Paginator = () => {
  return (
    <HStack>
      <Button>
        <ChevronLeftIcon />
      </Button>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button>4</Button>
      <Button>
        <ChevronRightIcon />
      </Button>
    </HStack>
  );
};

export default Paginator;
