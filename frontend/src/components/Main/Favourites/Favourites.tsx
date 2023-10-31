import { Heading, Box, Spinner } from "@chakra-ui/react";
import MovieGrid from "../MovieGrid/MovieGrid";
import { GET_FAVOURITES, GET_USER } from "../../../queries/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

// Simple rendering of all movies to show how it will be displayed when done
const Favourites = () => {
  const { loading: userLoading, data: userData } = useQuery(GET_USER);

  const [favourites, setFavourites] = useState([]);

  const { loading: favouritesLoading, data: favouritesData } = useQuery(
    GET_FAVOURITES,
    {
      variables: { userid: userData?.user.id },
    },
  );

  useEffect(() => {
    if (favouritesData) {
      setFavourites(favouritesData.favourites);
    }
  }, [favouritesData]);

  if (userLoading || favouritesLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Heading paddingLeft="30px">My Favourite Movies</Heading>
      <Box padding="5">
        <MovieGrid movies={favourites} />
      </Box>
    </>
  );
};

export default Favourites;
