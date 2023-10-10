import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Text,
  HStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import ColorModeSwitch from "./ColorModeSwitch";

const ProfileButton = () => {
  return (
    <Menu>
          <MenuButton as={Button} width="auto" height="48px" borderRadius={20}>
            <HStack justifyContent={"space-evenly"} padding={10}>
            <Avatar size="sm" ></Avatar>
            <Text>Username</Text>
            <ChevronDownIcon />
            </HStack>
            
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
