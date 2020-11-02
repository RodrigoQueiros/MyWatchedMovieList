import config from "../config/config";
import axios from "axios";
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
