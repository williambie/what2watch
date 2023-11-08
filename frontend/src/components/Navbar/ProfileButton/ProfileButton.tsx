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
import ColorModeSwitch from "./ColorModeSwitch/ColorModeSwitch";
import { Link } from "react-router-dom";
import { GET_USER } from "../../../queries/queries";
import { useQuery } from "@apollo/client";

// ProfileButton is a dropdown menu that allows the user to navigate to their favourites page or switch between light and dark mode
export const ProfileButton = () => {
  const { loading, data } = useQuery(GET_USER);

  // The dropdown menu is displayed on the navbar
  return (
    <Menu>
      <MenuButton as={Button} width="auto" height="48px" borderRadius={20}>
        <HStack justifyContent={"space-evenly"}>
          <Avatar size="sm" aria-label="User avatar"></Avatar>
          <Show above="lg">
            {loading ? (
              <Text paddingX={1}>Loading...</Text>
            ) : (
              <Text paddingX={1}>{data.user.username}</Text>
            )}
          </Show>
          <ChevronDownIcon aria-hidden="true" />
        </HStack>
      </MenuButton>
      <MenuList role="menu">
        <MenuItem as={Link} to={"/favourites"} role="menuitem">
          My Favourites
        </MenuItem>
        <MenuItem _hover={{ cursor: "auto" }} as={"label"}>
          <ColorModeSwitch aria-label="Toggle color mode" />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileButton;
