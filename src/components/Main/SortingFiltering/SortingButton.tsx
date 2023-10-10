import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

const SortingButton = () => {


  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: Popularity
      </MenuButton>
      <MenuList>
      <MenuItem
        >
          Popularity
        </MenuItem>
        <MenuItem
        >
          User Score
        </MenuItem>
        <MenuItem>
          Title
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortingButton;