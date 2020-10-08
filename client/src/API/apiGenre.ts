import { get } from "../utils/utils";

export function getAllGenres() {
  return get(
    "/genre/movie/list?api_key=" +
      process.env.VUE_APP_API_KEY +
      "&language=en-US"
  );
}
