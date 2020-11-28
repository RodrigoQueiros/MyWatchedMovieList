import config from "../config/config";
import axios from "axios";

// Correct poster path
export function correctPosterPath(path: string) {
  return "https://image.tmdb.org/t/p/w500" + path;
}

// Reduce overview length
export function reduceOverviewLength(overview: string) {
  if (overview.length >= 270) {
    return overview.substr(0, 270) + "...";
  } else return overview;
}

// Reduce title length
export function reduceTitleLength(title: string) {
  if (title.length >= 32) {
    return title.substr(0, 32) + "...";
  } else return title;
}

// Add minutes to time
export function addMinutesToTime(runtime: string) {
  return runtime + " m";
}

//Methods
export function post(uri: string, data: string) {
  return axios.post(endpoint(uri), data);
}

export function put(uri: string, data: string) {
  return axios.put(endpoint(uri), data);
}

export function get(uri: string) {
  return axios.get(endpoint(uri));
}
//Uri
export function endpoint(uri: string) {
  return config.BASE_URL + uri;
}
