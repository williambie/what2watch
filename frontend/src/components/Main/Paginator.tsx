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
    const numPagesToShow = 5;

    if (totalPages <= numPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (page <= Math.ceil(numPagesToShow / 2)) {
      for (let i = 1; i <= numPagesToShow - 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    } else if (page >= totalPages - Math.floor(numPagesToShow / 2)) {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = totalPages - numPagesToShow + 2; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
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
