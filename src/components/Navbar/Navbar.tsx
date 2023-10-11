import { HStack, Image, Show } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import logo from "../../assets/logo.png";
import ProfileButton from "./ProfileButton";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <HStack px={{base: 2, lg: "30px"}} py={3}>
      <Show above="lg">
      <Link to={"/"}><Image
          src={logo}
          marginRight="20px"
          boxSize="80px"
          border="white solid 1px"
        ></Image></Link>
      </Show>
      <SearchInput />
      <ProfileButton />
    </HStack>
  );
};

export default Navbar;
