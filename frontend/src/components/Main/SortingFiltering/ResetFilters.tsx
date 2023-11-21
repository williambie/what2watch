import { useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";
import { resetFilter } from "../../../redux/searchSlice";

// ResetFilters is a button that resets the filters
const ResetFilters = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetFilter());
  };

  return (
    <div>
      <Button onClick={handleReset}>Reset filters</Button>
    </div>
  );
};

export default ResetFilters;
