import { gql } from '@apollo/client';

const GET_USER = gql`
  query getUser {
    user(id: 1) {
      username
    }
  }
`;

export { GET_USER };