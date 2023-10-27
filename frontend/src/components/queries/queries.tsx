import { gql } from '@apollo/client';

const GET_USER = gql`
  query getUser {
    user(id: 1) {
      username
    }
  }
`;

const GET_GENRES  = gql`
  query getGenres {
    genres {
      name
      id
    }
  }
`;

export { GET_USER, GET_GENRES };