import { gql } from "@apollo/client";

// GET_USER is a GraphQL query that fetches the user with id 1
const GET_USER = gql`
  query getUser {
    user(id: 1) {
      username
      id
    }
  }
`;

// GET_REVIEWS is a GraphQL query that fetches the reviews for a movie with the given id
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

// ADD_REVIEW is a GraphQL mutation that adds a review to the database
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

// DELETE_REVIEW is a GraphQL mutation that deletes a review from the database
const DELETE_REVIEW = gql`
  mutation deleteReview($id: Int!) {
    deleteReview(id: $id)
  }
`;

// TOGGLE_FAVOURITE is a GraphQL mutation that toggles the favourite status of a movie
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

// GET_MOVIES is a GraphQL query that fetches movies from the database
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

// GET_FAVOURITE_MOVIES is a GraphQL query that fetches the user's favourite movies
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

// CHECK_FAVOURITE is a GraphQL query that checks if a movie is in the user's favourites
const CHECK_FAVOURITE = gql`
  query Query($movieid: Int!) {
    checkFavourite(movieid: $movieid)
  }
`;

// GET_GENRE_COUNTS is a GraphQL query that fetches the number of movies in each genre
const GET_GENRE_COUNTS = gql`
  query GetGenreCounts($searchTerm: String) {
    genreCounts(searchTerm: $searchTerm) {
      name
      id
      count
    }
  }
`;

const GET_GENRES = gql`
  query GetGenres {
    genres {
      id
      name
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
  GET_GENRES,
};
