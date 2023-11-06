import { Heading, Box, Text, useMediaQuery } from "@chakra-ui/react";
import MovieGrid from "../MovieGrid/MovieGrid";
import { GET_FAVOURITE_MOVIES } from "../../../queries/queries";
import { useQuery } from "@apollo/client";

const Favourites = () => {
  // Get favourite movies from the cache and display them in a grid format using the MovieGrid component
  const { loading, data } = useQuery(GET_FAVOURITE_MOVIES);
  const [isSmallScreen] = useMediaQuery("(max-width: 600px)");

  // If there are no favourite movies, display a message to the user to add some favourite movies
  // else display the favourite movies in a grid format
  return (
    <>
      <Box display="flex" alignItems="center" padding="30px">
        <Heading flexGrow={1} textAlign="left">
          {isSmallScreen ? "My Favourites" : "My Favourite Movies"}
        </Heading>
      </Box>
      <Box padding="5">
        {data?.favouriteMovies.length === 0 ? (
          <Text padding="10px">
            You have no favourite movies, why don't you add some?
          </Text>
        ) : (
          <MovieGrid movies={data?.favouriteMovies || []} loading={loading} />
        )}
      </Box>
    </>
  );
};

export default Favourites;
