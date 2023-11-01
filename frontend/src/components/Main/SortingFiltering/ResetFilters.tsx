import { useDispatch } from "react-redux";
import {
  setSelectedGenre,
  setSorting,
  setPage,
  setSearchTerm,
} from "../../../redux/searchSlice";
import { Button } from "@chakra-ui/react";

const ResetFilters = () => {
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(setSelectedGenre(null));
    dispatch(setSorting({ sortBy: "popularity", sortOrder: -1 }));
    dispatch(setPage(1));
    dispatch(setSearchTerm(""));
  };

  return (
    <div>
      <Button onClick={handleReset}>Reset filters</Button>
    </div>
  );
};

export default ResetFilters;
