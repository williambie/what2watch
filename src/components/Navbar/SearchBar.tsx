import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface SearchInputProps {
  onSearchChange: (value: string) => void;
}

const SearchInput = ({ onSearchChange }: SearchInputProps) => {
  return (
    <InputGroup size="lg">
      <InputLeftElement children={<SearchIcon />} />
      <Input
        borderRadius={20}
        placeholder="Search movies..."
        variant="filled"
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchInput;
