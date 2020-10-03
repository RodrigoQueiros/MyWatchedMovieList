import { get, post, put } from "../utils/utils";

export function getMovieDetailsById(body: string) {
  return get(
    "/movie/" +
      body +
      "?api_key=" +
      process.env.VUE_APP_API_KEY +
      "&language=en-US"
  );
}

export function getPopularMovies() {
  return get(
    "/movie/popular" +
      "?api_key=" +
      process.env.VUE_APP_API_KEY +
      "&language=en-US&page=1"
  );
}

export function editSensor(body: string, id: string) {
  return put("/sensors/" + id, body);
}

export function addSensor(body: string) {
  return post("/sensors", body);
}

// export function removeSensor(body: string) {
//   return remove("/sensors/" + body);
// }
