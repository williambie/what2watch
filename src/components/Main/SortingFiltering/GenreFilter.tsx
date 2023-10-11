import { Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import genres from "../../../data/genres.json";
import { useState } from "react";

interface Props {
  onSelectGenre: (genre: number) => void;
}

const GenreFilter = ({onSelectGenre}: Props) => {
  const [selectedGenreName, setSelectedGenreName] = useState<string>("Genres");

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedGenreName}
      </MenuButton>
      <MenuList>
        <MenuItem marginRight={2} onClick={() => {
            onSelectGenre(0);
            setSelectedGenreName("Genres");
          }}>
          All Genres
        </MenuItem>
        <MenuDivider />
      {genres.genres.map((genre) => (
        <MenuItem key={genre.id} marginRight={2} 
        onClick={() => {
          onSelectGenre(genre.id);
          setSelectedGenreName(genre.name)
        }}>
          {genre.name}
        </MenuItem>
      ))}
      </MenuList>
    </Menu>
  );
};

export default GenreFilter;