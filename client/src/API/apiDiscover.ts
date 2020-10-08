import { get } from "../utils/utils";

export function getMoviesByGenreId(body: string) {
  console.log(body);
  return get(
    "/discover/movie?api_key=" +
      process.env.VUE_APP_API_KEY +
      "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" +
      body
  );
}

export function getMoviesAdvancedSearch(body: string) {
  return get(
    "/discover/movie?api_key=" +
      process.env.VUE_APP_API_KEY +
      "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1" +
      body
  );
}
