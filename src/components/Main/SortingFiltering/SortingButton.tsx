import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  onSortChange: (sortBy: string) => void;
}

const SortingButton = ({onSortChange}: Props) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Popularity");

  const handleMenuItemClick = (sortBy: string, label: string) => {
    setSelectedMenuItem(label);
    onSortChange(sortBy);
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: {selectedMenuItem}
      </MenuButton>
      <MenuList>
      <MenuItem onClick={() => handleMenuItemClick("popularity", "Popularity")}
        >
          Popularity
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("vote_average", "User Score")}
        >
          User Score
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("title", "Title")}>
          Title
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortingButton;