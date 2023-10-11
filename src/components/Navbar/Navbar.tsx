import { HStack, Image, Show } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import logo from "../../assets/logo.png";
import ProfileButton from "./ProfileButton";

interface NavbarProps {
  onSearchChange: (value: string) => void;
}

const Navbar = ({ onSearchChange }: NavbarProps) => {
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
      <SearchBar onSearchChange={onSearchChange} />
      <ProfileButton />
    </HStack>
  );
};

export default Navbar;
