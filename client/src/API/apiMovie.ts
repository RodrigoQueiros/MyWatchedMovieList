import { get } from '../utils/utils';

export function getMovieDetailsById(body: string) {
  return get(
    '/movie/' +
      body +
      '?api_key=' +
      process.env.VUE_APP_API_KEY +
      '&language=en-US',
  );
}

export function getPopularMovies() {
  return get(
    '/movie/popular' +
      '?api_key=' +
      process.env.VUE_APP_API_KEY +
      '&language=en-US&page=1',
  );
}

export function getTopMovies() {
  return get(
    '/movie/top_rated' +
      '?api_key=' +
      process.env.VUE_APP_API_KEY +
      '&language=en-US&page=1',
  );
}

export function getUpcomingMovies() {
  return get(
    '/movie/upcoming' +
      '?api_key=' +
      process.env.VUE_APP_API_KEY +
      '&language=en-US&page=1',
  );
}

export function getRecommendedMovieById(body: string) {
  return get(
    '/movie/' +
      body +
      '/recommendations?api_key=' +
      process.env.VUE_APP_API_KEY +
      '&language=en-US',
  );
}

export function getRandomMovie(body: string) {
  return get(
    '/movie/popular' +
      '?api_key=' +
      process.env.VUE_APP_API_KEY +
      '&language=en-US&page=' +
      body,
  );
}

// export function editSensor(body: string, id: string) {
//   return put("/sensors/" + id, body);
// }
