import { Badge } from "@chakra-ui/react";

interface Props {
  vote_average: number;
}

const UserVoteAverage = ({ vote_average }: Props) => {
  const color =
    vote_average > 7.5 ? "green" : vote_average > 6 ? "yellow" : "red";

  return (
    <Badge colorScheme={color} fontSize="16px" borderRadius="4px">
      {vote_average.toFixed(1)}
    </Badge>
  );
};

export default UserVoteAverage;
