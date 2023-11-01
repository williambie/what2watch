import { Heading, Box, Text, Button } from "@chakra-ui/react";
import MovieGrid from "../MovieGrid/MovieGrid";
import { GET_FAVOURITE_MOVIES } from "../../../queries/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const Favourites = () => {
  const { loading, data } = useQuery(GET_FAVOURITE_MOVIES);

  return (
    <>
      <Box display="flex" alignItems="center" padding="30px">
        <Link to={"/"} style={{ textDecoration: "none", marginRight: "auto" }}>
          <Button colorScheme="blue" size="md">
            Home
          </Button>
        </Link>
        <Heading flexGrow={1} textAlign="center">
          My Favourite Movies
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
