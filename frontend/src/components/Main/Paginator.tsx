import { Box, Button, HStack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/searchSlice";
import { RootState } from "../../redux/store";

interface PaginatorProps {
  totalPages: number;
}

const Paginator = ({ totalPages }: PaginatorProps) => {
  const { page } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const numPagesToShow = 5;

    const addRange = (start: number, end: number) => {
      for (let i = start; i <= end; i++) pageNumbers.push(i);
    };

    if (totalPages <= numPagesToShow) {
      // If there are less than 5 pages, all pages are displayed
      addRange(1, totalPages);
    } else {
      const isStart = page <= Math.ceil(numPagesToShow / 2);
      const isEnd = page >= totalPages - Math.floor(numPagesToShow / 2);

      if (isStart) {
        // If the current page is less than or equal 3, the first 4 pages are displayed
        addRange(1, numPagesToShow - 1);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (isEnd) {
        // If the current page is greater than the total number of pages minus 3, the last 4 pages are displayed
        pageNumbers.push(1, "...");
        addRange(totalPages - numPagesToShow + 2, totalPages);
      } else {
        // Otherwise, the current page is in the middle of the paginator
        pageNumbers.push(1, "...");
        addRange(
          page - Math.floor(numPagesToShow / 2),
          page + Math.floor(numPagesToShow / 2),
        );
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // The paginator is displayed
  return (
    <HStack spacing={2} justify="center">
      <Button
        isDisabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        size={["md", "lg"]}
      >
        <ChevronLeftIcon />
      </Button>

      <Box display={["none", "none", "flex"]}>
        <HStack spacing={2}>
          {getPageNumbers().map((pageNum, index) => (
            <Button
              key={index}
              colorScheme={pageNum === page ? "blue" : undefined}
              onClick={() =>
                typeof pageNum === "number" && handlePageChange(pageNum)
              }
              isDisabled={pageNum === "..."}
              size="lg"
            >
              {pageNum}
            </Button>
          ))}
        </HStack>
      </Box>

      <Box display={["flex", "flex", "none"]} flexDirection="row">
        <HStack spacing={1}>
          {page > 2 && <Button onClick={() => setPage(1)}>1</Button>}
          {page > 1 && (
            <Button onClick={() => handlePageChange(page - 1)}>
              {page - 1}
            </Button>
          )}
          <Button colorScheme="blue">{page}</Button>
          {page < totalPages && (
            <Button onClick={() => handlePageChange(page + 1)}>
              {page + 1}
            </Button>
          )}
          {page < totalPages - 1 && (
            <Button onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </Button>
          )}
        </HStack>
      </Box>

      <Button
        isDisabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        size={["md", "lg"]}
      >
        <ChevronRightIcon />
      </Button>
    </HStack>
  );
};

export default Paginator;
