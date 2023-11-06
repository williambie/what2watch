import { HStack, Image } from "@chakra-ui/react";
import SearchBar from "./SearchBar/SearchBar";
import logo from "../../assets/logo.png";
import ProfileButton from "./ProfileButton/ProfileButton";
import { Link } from "react-router-dom";

// Navbar is the top bar of the application
const Navbar = () => {
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
      <SearchBar />
      <ProfileButton />
    </HStack>
  );
};

export default Navbar;
