import { HStack, Image } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import logo from "../../assets/logo.png";
import ProfileButton from "./ProfileButton";
import { Link } from "react-router-dom";

interface NavbarProps {
  onSearchChange: (value: string) => void;
}

// Navbar is the top bar of the application
const Navbar = ({ onSearchChange }: NavbarProps) => {
  return (
    <HStack px={{ base: 2, lg: "30px" }} py={3}>
      <Link to={"/"}>
        <Image
          src={logo}
          marginRight="20px"
          boxSize="80px"
          border="white solid 1px"
          height="auto"
          mx="auto"
        ></Image>
      </Link>
      <SearchBar onSearchChange={onSearchChange} />
      <ProfileButton />
    </HStack>
  );
};

export default Navbar;
