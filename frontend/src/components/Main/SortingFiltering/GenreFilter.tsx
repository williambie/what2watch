import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_GENRES } from "../../../queries/queries";
import { Genre } from "../../../types/types";

interface Props {
  onSelectGenre: (genre: string | null) => void;
}

// GenreFilter is a dropdown menu that allows the user to filter movies by genre
const GenreFilter = ({ onSelectGenre }: Props) => {
  const [selectedGenreName, setSelectedGenreName] = useState<string>("Genres");
  const { loading, data } = useQuery(GET_GENRES);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedGenreName}
      </MenuButton>
      <MenuList>
        <MenuItem
          marginRight={2}
          onClick={() => {
            onSelectGenre(null);
            setSelectedGenreName("Genres");
          }}
        >
          All Genres
        </MenuItem>
        <MenuDivider />
        {!loading &&
          data.genres.map((genre: Genre) => (
            genre.moviesInGenreCount > 0 && (
            <MenuItem
              key={genre.id}
              marginRight={2}
              onClick={() => {
                onSelectGenre(genre.name);
                setSelectedGenreName(genre.name);
              }}
            >
              {genre.name} ({genre.moviesInGenreCount})
            </MenuItem>
            )
          ))}
      </MenuList>
    </Menu>
  );
};

export default GenreFilter;
