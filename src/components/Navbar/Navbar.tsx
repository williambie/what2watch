import { HStack, Image, Show } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import logo from "../../assets/logo.png";
import ProfileButton from "./ProfileButton";

const Navbar = () => {
  return (
    <HStack padding="20px">
      <Show above="lg">
        <Image
          src={logo}
          marginRight="20px"
          boxSize="80px"
          border="white solid 1px"
        ></Image>
      </Show>
      <SearchInput />
      <ProfileButton />
    </HStack>
  );
};

export default Navbar;
