import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { useQuery } from "@apollo/client";
import { GET_GENRE_COUNTS } from "../../../../queries/queries";
import { Genre } from "../../../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedGenre } from "../../../../redux/searchSlice";
import { RootState } from "../../../../redux/store";
import { useEffect } from "react";

// GenreFilter is a dropdown menu that allows the user to filter movies by genre
const GenreFilter = () => {
  const dispatch = useDispatch();
  const selectedGenreName = useSelector(
    (state: RootState) => state.search.selectedGenre,
  );
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  const handleGenreChange = (genre: string | null) => {
    dispatch(setSelectedGenre(genre));
  };

  const {
    loading,
    data: genreCountsData,
    refetch,
  } = useQuery(GET_GENRE_COUNTS, {
    variables: { searchTerm: searchTerm },
  });

  // The genre counts are refetched when the search term changes
  useEffect(() => {
    refetch({ searchTerm: searchTerm });
  }, [searchTerm, refetch]);
  useEffect(() => {
    refetch({ searchTerm: searchTerm });
  }, [searchTerm, refetch]);

  const genreCounts = genreCountsData?.genreCounts || [];

  // The dropdown menu is displayed on the main page
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedGenreName || "Genres"}
      </MenuButton>
      <MenuList>
        <MenuItem
          marginRight={2}
          key={0}
          onClick={() => {
            handleGenreChange(null);
          }}
        >
          All Genres
        </MenuItem>
        <MenuDivider />
        {!loading &&
          genreCounts.map(
            (genre: Genre) =>
              genre.count > 0 && (
                <MenuItem
                  key={genre.id}
                  marginRight={2}
                  onClick={() => {
                    handleGenreChange(genre.name);
                  }}
                >
                  {genre.name} ({genre.count})
                </MenuItem>
              ),
          )}
      </MenuList>
    </Menu>
  );
};

export default GenreFilter;
