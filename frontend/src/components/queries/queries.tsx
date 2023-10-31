import { gql } from "@apollo/client";

const GET_USER = gql`
  query getUser {
    user(id: 1) {
      username
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

const GET_MOVIES = gql`
  query getMovies($limit: Int!, $offset: Int!) {
    movies(limit: $limit, offset: $offset) {
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

export { GET_USER, GET_GENRES, GET_MOVIES, GET_MOVIE_COUNT };
