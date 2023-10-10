import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import genres from "../../../data/genres.json";

const GenreFilter = () => {


  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Genres
      </MenuButton>
      <MenuList>
      {genres.genres.map((genre) => (
        <MenuItem key={genre.id} marginRight={2}>
          {genre.name}
        </MenuItem>
      ))}
      </MenuList>
    </Menu>
  );
};

export default GenreFilter;