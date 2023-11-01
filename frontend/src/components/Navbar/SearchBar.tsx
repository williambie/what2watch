import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../redux/searchSlice";
import { debounce } from "lodash";

// SearchInput is the search bar that allows the user to search for movies
const SearchInput = () => {
  const dispatch = useDispatch();

  const debouncedSearch = debounce((value: string) => {
    dispatch(setSearchTerm(value));
  }, 750);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <InputGroup size="lg">
      <InputLeftElement children={<SearchIcon />} />
      <Input
        borderRadius={20}
        placeholder="Search movies..."
        variant="filled"
        onChange={handleInputChange}
      />
    </InputGroup>
  );
};

export default SearchInput;
