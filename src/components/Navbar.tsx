import { HStack, Image } from '@chakra-ui/react';
import SearchInput from './SearchInput';

const Navbar = () => {
  return (
    <HStack padding={10} bgColor="gray">
      <Image></Image>
      <SearchInput />
    </HStack>
  );
};

export default Navbar;
