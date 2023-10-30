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
import { GET_USER } from "../../queries/queries";
import { useQuery } from "@apollo/client";

// ProfileButton is a dropdown menu that allows the user to navigate to their favourites page or switch between light and dark mode
export const ProfileButton = () => {
  const { loading, data } = useQuery(GET_USER);

  return (
    <Menu>
      <MenuButton as={Button} width="auto" height="48px" borderRadius={20}>
        <HStack justifyContent={"space-evenly"}>
          <Avatar size="sm"></Avatar>
          <Show above="lg">
          {loading ? (
              <Text paddingX={1}>Loading...</Text>
            ) : (
              <Text paddingX={1}>{data.user.username}</Text>
            )}
          </Show>
          <ChevronDownIcon />
        </HStack>
      </MenuButton>
      <MenuList>
        <Link to={"/favourites"}>
          <MenuItem>My Favourites</MenuItem>
        </Link>
        <MenuItem _hover={{ cursor: "auto" }}>
          <ColorModeSwitch />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileButton;
