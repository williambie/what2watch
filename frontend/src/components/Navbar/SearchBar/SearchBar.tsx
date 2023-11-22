import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../../redux/searchSlice";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

// SearchInput is the search bar that allows the user to search for movies
const SearchInput = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [dispatch]);

  // The search term is updated when the user types in the search bar
  // The search term is debounced to avoid making too many requests
  const search = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  const debouncedSearchFunction = debounce(search, 750);

  const debouncedSearch = useCallback(
    (value: string) => {
      debouncedSearchFunction(value);
    },
    [debouncedSearchFunction],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleClearInput = () => {
    setInputValue("");
    dispatch(setSearchTerm(""));
  };

  // The dropdown menu is displayed on the main page
  return (
    <InputGroup size="lg">
      <InputLeftElement children={<SearchIcon />} />
      <Input
        borderRadius={20}
        placeholder="Search movies..."
        variant="filled"
        onChange={handleInputChange}
        value={inputValue}
      />
      <InputRightElement children={<CloseIcon onClick={handleClearInput} />} />
    </InputGroup>
  );
};

export default SearchInput;
