import { Heading, Box, Text } from "@chakra-ui/react";
import MovieGrid from "../MovieGrid/MovieGrid";
import { GET_FAVOURITE_MOVIES } from "../../../queries/queries";
import { useQuery } from "@apollo/client";

const Favourites = () => {
  const { loading, data } = useQuery(GET_FAVOURITE_MOVIES);

  return (
    <>
      <Heading paddingLeft="30px">My Favourite Movies</Heading>
      <Box padding="5">
        {data?.favouriteMovies.length === 0 ? (
          <Text padding="10px">You have no favourite movies, why don't you add some?</Text>
        ) : (
          <MovieGrid
            movies={data?.favouriteMovies || []}
            loading={loading}
          />
        )}
      </Box>
    </>
  );
};

export default Favourites;
