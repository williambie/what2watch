import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Text,
  HStack,
  Show,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import ColorModeSwitch from "./ColorModeSwitch";
import { Link } from "react-router-dom";

const ProfileButton = () => {
  return (
    <Menu>
      <MenuButton as={Button} width="auto" height="48px" borderRadius={20}>
        <HStack justifyContent={"space-evenly"}>
          <Avatar size="sm"></Avatar>
          <Show above="lg">
            <Text paddingX={1}>Martha</Text>
          </Show>
          <ChevronDownIcon />
        </HStack>
      </MenuButton>
      <MenuList>
        <Link to={"/favourites"}>
          <MenuItem>My Favourites</MenuItem>
        </Link>
        <MenuItem>
          <ColorModeSwitch />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileButton;
