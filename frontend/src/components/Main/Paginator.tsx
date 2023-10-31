import { Box, Button, HStack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface PaginatorProps {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Paginator = ({ page, setPage, totalPages }: PaginatorProps) => {
  const getPageNumbers = () => {
    // The page numbers to be displayed are calculated
    const pageNumbers = [];
    const numPagesToShow = 5;

    // If there are less than 5 pages, all pages are displayed
    if (totalPages <= numPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      // If the current page is less than or equal 3, the first 4 pages are displayed
    } else if (page <= Math.ceil(numPagesToShow / 2)) {
      for (let i = 1; i <= numPagesToShow - 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
      // If the current page is greater than the total number of pages minus 3, the last 4 pages are displayed
    } else if (page >= totalPages - Math.floor(numPagesToShow / 2)) {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = totalPages - numPagesToShow + 2; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      // Otherwise, the current page is in the middle of the paginator and the current page,
      // the two pages before and the two pages after are displayed
    } else {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (
        let i = page - Math.floor(numPagesToShow / 2);
        i <= page + Math.floor(numPagesToShow / 2);
        i++
      ) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }
    // The page numbers are returned
    return pageNumbers;
  };

  // The paginator is displayed
  return (
    <HStack spacing={2} justify="center">
      <Button
        isDisabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}
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
              onClick={() => typeof pageNum === "number" && setPage(pageNum)}
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
            <Button onClick={() => setPage((prev) => prev - 1)}>
              {page - 1}
            </Button>
          )}
          <Button colorScheme="blue">{page}</Button>
          {page < totalPages && (
            <Button onClick={() => setPage((prev) => prev + 1)}>
              {page + 1}
            </Button>
          )}
          {page < totalPages - 1 && (
            <Button onClick={() => setPage(totalPages)}>{totalPages}</Button>
          )}
        </HStack>
      </Box>

      <Button
        isDisabled={page === totalPages}
        onClick={() => setPage((prev) => prev + 1)}
        size={["md", "lg"]}
      >
        <ChevronRightIcon />
      </Button>
    </HStack>
  );
};

export default Paginator;
