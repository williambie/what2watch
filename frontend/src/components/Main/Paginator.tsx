import { Button, HStack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface PaginatorProps {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Paginator = ({ page, setPage, totalPages }: PaginatorProps) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const numPagesToShow = Math.min(totalPages, 5); // Number of page buttons to show

    // Calculate the starting page number based on the current page
    let startPage = Math.max(page - 2, 1);
    let endPage = startPage + numPagesToShow - 1;

    // Ensure that the last page button doesn't go beyond the total pages
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - numPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    console.log("Page: ", page, "Total pages: ", totalPages);

    return pageNumbers;
  };

  return (
    <HStack>
      <Button
        isDisabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      {getPageNumbers().map((pageNum, index) => (
        <Button
          key={index}
          colorScheme={pageNum === page ? "blue" : undefined}
          onClick={() => {
            if (typeof pageNum === "number") {
              setPage(pageNum);
            }
          }}
        >
          {pageNum}
        </Button>
      ))}
      <Button
        isDisabled={page === totalPages}
        onClick={() => {
          if (page < totalPages) {
            setPage((prev) => prev + 1);
          }
        }}
      >
        <ChevronRightIcon />
      </Button>
    </HStack>
  );
};

export default Paginator;
