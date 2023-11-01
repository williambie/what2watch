import { useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";
import { resetFilter } from "../../../redux/searchSlice";

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
