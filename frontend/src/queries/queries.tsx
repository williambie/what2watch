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

const ADD_REVIEW = gql`
  mutation addReview($review: ReviewInput!) {
    addReview(review: $review) {
      content
      timestamp
      rating
      user {
        id
      }
      movie {
        id
      }
    }
  }
`;

export { GET_USER, GET_GENRES, ADD_REVIEW };