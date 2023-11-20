import { test } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { resolvers } from '../resolvers';
import User from "../../models/user.js";
import Review from "../../models/review.js";
import Movie from "../../models/movie.js";
import Genre from "../../models/genre.js";

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

test('addUser creates a new user', async () => {
  const username = 'testuser'
  const result = await resolvers.Mutation.addUser(null, { username })
  expect(result.username).toBe(username)

  // Verify that the user was saved to the database
  const savedUser = await User.findOne({ username })
  expect(savedUser).not.toBeNull()
  expect(savedUser.username).toBe(username)
})

test('addReview creates a new review', async () => {
  const reviewData = {
    content: 'Great movie!',
    rating: 5,
    timestamp: Date.now(),
    movieid: 1,
    userid: 1
  }
  const result = await resolvers.Mutation.addReview(null, reviewData)
  expect(result.content).toBe(reviewData.content)
  expect(result.rating).toBe(reviewData.rating)

  // Verify that the review was saved to the database
  const savedReview = await Review.findOne({ id: result.id })
  expect(savedReview).not.toBeNull()
  expect(savedReview.content).toBe(reviewData.content)
  expect(savedReview.rating).toBe(reviewData.rating)
})

test('movies returns the movies that match the search term', async () => {
  await new Movie({ title: 'Test Movie 1' }).save()
  await new Movie({ title: 'Test Movie 2' }).save()

  const result = await resolvers.Query.movies(null, { searchTerm: '1' })
  expect(result.movies).toHaveLength(1)
  expect(result.movies[0].title).toBe('Test Movie 1')
})

test('favouriteMovies returns the favourite movies', async () => {
  const favouriteMovie = new Movie({ title: 'Favourite Movie', favourite: true })
  await favouriteMovie.save()
  const nonFavouriteMovie = new Movie({ title: 'Non-Favourite Movie', favourite: false })
  await nonFavouriteMovie.save()

  const result = await resolvers.Query.favouriteMovies()
  expect(result).toHaveLength(1)
  expect(result[0].title).toBe('Favourite Movie')
})

test('toggleFavourite toggles the favourite field of a movie', async () => {
  const movie = new Movie({ title: 'Test Movie', favourite: false, id: 123 })
  await movie.save()

  await resolvers.Mutation.toggleFavourite(null, { movieid: movie.id })

  const updatedMovie = await Movie.findOne({ id: movie.id })
  expect(updatedMovie.title).toBe('Test Movie')
  expect(updatedMovie.favourite).toBe(true)
})