import { Button, HStack, Image, Spacer } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
import logo from "../../assets/logo.png";
import ProfileButton from "./ProfileButton/ProfileButton";

// Navbar is the top bar of the application
const Navbar = () => {
  const location = useLocation();

  // The navbar is displayed
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
          alt="logo"
        />
      </Link>
      {location.pathname === "/favourites" ? (
        <Link to="/" style={{ textDecoration: "none", marginRight: "auto" }}>
          <Button ml={2} colorScheme="blue" size="md">
            Home
          </Button>
        </Link>
      ) : (
        <SearchBar />
      )}
      <Spacer />
      <ProfileButton />
    </HStack>
  );
};

export default Navbar;
