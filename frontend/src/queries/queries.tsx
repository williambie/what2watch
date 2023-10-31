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

const CHECK_FAVOURITE = gql`
  query checkFavourite($id: Int!) {
    movie(id: $id) {
      favourite
      id
      title
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

const ADD_FAVOURITE = gql`
  mutation addFavourite($movieid: Int!, $userid: Int!) {
    addFavourite(movieid: $movieid, userid: $userid) {
      movieid
      userid
    }
  }
`;

const REMOVE_FAVOURITE = gql`
  mutation Mutation($movieid: Int!, $userid: Int!) {
    deleteFavourite(movieid: $movieid, userid: $userid)
  }
`;

const TOGGLE_FAVOURITE = gql`
  mutation ToggleFavourite($movieid: Int!) {
    toggleFavourite(movieid: $movieid)
  }
`;

const GET_FAVOURITES = gql`
  query getFavourites($userid: Int!) {
    favourites(userid: $userid) {
      id
      title
      poster_path
      vote_average
      overview
      release_date
      popularity
      genres {
        name
        id
      }
      reviews {
        id
        content
        timestamp
        rating
        movieid
        userid
      }
    }
  }
`;

const GET_MOVIES = gql`
  query getMovies($limit: Int!, $offset: Int!, $sortField: String!, $sortOrder: Int!) {
    movies(limit: $limit, offset: $offset, sortField: $sortField, sortOrder: $sortOrder) {
      id
      title
      overview
      poster_path
      vote_average
      popularity
      genres {
        name
        id
      }
    }
    moviesCount
  }
`;

const GET_MOVIE_COUNT = gql`
  query getMovieCount {
    moviesCount
  }
`;

export {
  GET_USER,
  GET_GENRES,
  GET_MOVIE_GENRES,
  ADD_REVIEW,
  GET_REVIEWS,
  DELETE_REVIEW,
  ADD_FAVOURITE,
  REMOVE_FAVOURITE,
  TOGGLE_FAVOURITE,
  CHECK_FAVOURITE,
  GET_FAVOURITES,
  GET_MOVIES, 
  GET_MOVIE_COUNT
};
