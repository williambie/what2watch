import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import ColorModeSwitch from "./ColorModeSwitch";

const ProfileButton = () => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        My profile
      </MenuButton>
      <MenuList>
        <MenuItem>Favourites</MenuItem>
        <MenuItem>Logout</MenuItem>
        <MenuItem>
          <ColorModeSwitch />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileButton;
