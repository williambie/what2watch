import { gql } from "@apollo/client";

const GET_USER = gql`
  query getUser {
    user(id: 1) {
      username
      id
    }
  }
`;

const GET_GENRES = gql`
  query getGenres {
    genres {
      name
      id
    }
  }
`;

const GET_MOVIE_GENRES = gql`
  query getMovieGenres($id: Int!) {
    movie(id: $id) {
      genres {
        name
        id
      }
    }
  }
`;

const GET_REVIEWS = gql`
  query Reviews($id: Int!) {
    movie(id: $id) {
      reviews {
        id
        content
        rating
        timestamp
        userid
      }
    }
  }
`;

const ADD_REVIEW = gql`
  mutation AddReview(
    $content: String!
    $rating: Int!
    $timestamp: String!
    $movieid: Int!
    $userid: Int!
  ) {
    addReview(
      content: $content
      rating: $rating
      timestamp: $timestamp
      movieid: $movieid
      userid: $userid
    ) {
      content
      rating
      timestamp
      movieid
      userid
    }
  }
`;

const DELETE_REVIEW = gql`
mutation deleteReview($id: Int!) {
  deleteReview(id: $id)
}
`;

export { GET_USER, GET_GENRES, GET_MOVIE_GENRES, ADD_REVIEW, GET_REVIEWS, DELETE_REVIEW };
