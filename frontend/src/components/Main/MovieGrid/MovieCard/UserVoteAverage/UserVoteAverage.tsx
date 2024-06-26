import { Badge } from "@chakra-ui/react";

interface Props {
  vote_average: number;
}

// UserVoteAverage is a badge that displays the vote average of a movie
const UserVoteAverage = ({ vote_average }: Props) => {
  const color =
    vote_average > 7.5 ? "green" : vote_average > 6 ? "yellow" : "red";

  // Display the vote average with one decimal place
  return (
    <Badge colorScheme={color} fontSize="16px" borderRadius="4px">
      {vote_average.toFixed(1)}
    </Badge>
  );
};

export default UserVoteAverage;
