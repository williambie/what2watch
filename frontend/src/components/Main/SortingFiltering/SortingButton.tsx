import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  onSortChange: (sortOptions: { sortBy: string, sortOrder: number }) => void;
}

// SortingButton is a dropdown menu that allows the user to sort movies by popularity, user score, or title
const SortingButton = ({ onSortChange }: Props) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Popularity");

  const handleMenuItemClick = (sortBy: string, sortOrder: number, label: string) => {
    onSortChange({ sortBy, sortOrder });
    setSelectedMenuItem(label);
  };

  // The dropdown menu is displayed on the main page
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: {selectedMenuItem}
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => handleMenuItemClick("popularity", -1, "Popularity")}
        >
          Popularity
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("vote_average", -1, "User Score")}
        >
          User Score
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("title", 1, "Title")}>
          Title (A-Z)
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("title", -1, "Title")}>
          Title (Z-A)
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortingButton;
