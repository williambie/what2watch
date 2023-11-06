import { gql } from "@apollo/client";

const GET_USER = gql`
  query getUser {
    user(id: 1) {
      username
      id
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

const TOGGLE_FAVOURITE = gql`
  mutation ToggleFavourite($movieid: Int!) {
    toggleFavourite(movieid: $movieid) {
      id
      title
      poster_path
      vote_average
      overview
      release_date
      popularity
      genres {
        id
        name
      }
      reviews {
        id
        content
        rating
        timestamp
        movieid
        userid
      }
      favourite
    }
  }
`;

const GET_MOVIES = gql`
  query getMovies(
    $limit: Int!
    $offset: Int!
    $sortField: String!
    $sortOrder: Int!
    $genre: String
    $searchTerm: String
  ) {
    movies(
      limit: $limit
      offset: $offset
      sortField: $sortField
      sortOrder: $sortOrder
      genre: $genre
      searchTerm: $searchTerm
    ) {
      moviesCount
      movies {
        id
        title
        poster_path
        vote_average
        overview
        release_date
        popularity
        favourite
        genres {
          id
          name
        }
        reviews {
          id
          content
          rating
          movieid
          timestamp
          userid
        }
        cast {
          name
          character
          profile_path
        }
      }
    }
  }
`;

const GET_FAVOURITE_MOVIES = gql`
  query FavouriteMovies {
    favouriteMovies {
      id
      title
      poster_path
      vote_average
      overview
      release_date
      popularity
      genres {
        id
        name
      }
      reviews {
        id
        content
        rating
        timestamp
        movieid
        userid
      }
      cast {
        name
        character
        profile_path
      }
      favourite
    }
  }
`;

const CHECK_FAVOURITE = gql`
  query Query($movieid: Int!) {
    checkFavourite(movieid: $movieid)
  }
`;

const GET_GENRE_COUNTS = gql`
  query GetGenreCounts($searchTerm: String) {
    genreCounts(searchTerm: $searchTerm) {
      name
      id
      count
    }
  }
`;

export {
  GET_USER,
  ADD_REVIEW,
  GET_REVIEWS,
  DELETE_REVIEW,
  TOGGLE_FAVOURITE,
  GET_MOVIES,
  GET_FAVOURITE_MOVIES,
  CHECK_FAVOURITE,
  GET_GENRE_COUNTS,
};
