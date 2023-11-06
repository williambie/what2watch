import { Button, HStack, Image, Spacer } from "@chakra-ui/react";
import SearchBar from "./SearchBar/SearchBar";
import logo from "../../assets/logo.png";
import ProfileButton from "./ProfileButton/ProfileButton";
import { Link, useLocation } from "react-router-dom";

// Navbar is the top bar of the application
const Navbar = () => {

  const location = useLocation();

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
      {location.pathname !== '/favourites' && <SearchBar />}
      {location.pathname === '/favourites' && <Link  to={"/"} style={{ textDecoration: "none", marginRight: "auto" }}>
          <Button marginLeft={2} colorScheme="blue" size="md">
            Home
          </Button>
        </Link>}
      <Spacer />
      <ProfileButton />
    </HStack>
  );
};

export default Navbar;
