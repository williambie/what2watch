import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setSorting } from "../../../redux/searchSlice";
import { RootState } from "../../../redux/store";

const SortingButton = () => {
  const { sorting } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  const getLabel = (sortBy: string, sortOrder: number) => {
    if (sortBy === "popularity" && sortOrder === -1) return "Popularity";
    if (sortBy === "vote_average" && sortOrder === -1) return "User Score";
    if (sortBy === "title" && sortOrder === 1) return "Title (A-Z)";
    if (sortBy === "title" && sortOrder === -1) return "Title (Z-A)";
    return "Popularity";
  };

  const handleSortChange = (sortOptions: {
    sortBy: string;
    sortOrder: number;
  }) => {
    dispatch(setSorting(sortOptions));
  };

  const label = getLabel(sorting.sortBy, sorting.sortOrder);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: {label}
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() =>
            handleSortChange({ sortBy: "popularity", sortOrder: -1 })
          }
        >
          Popularity
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleSortChange({ sortBy: "vote_average", sortOrder: -1 })
          }
        >
          User Score
        </MenuItem>
        <MenuItem
          onClick={() => handleSortChange({ sortBy: "title", sortOrder: 1 })}
        >
          Title (A-Z)
        </MenuItem>
        <MenuItem
          onClick={() => handleSortChange({ sortBy: "title", sortOrder: -1 })}
        >
          Title (Z-A)
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortingButton;
