import { get, post, put } from "../utils/utils";

export function getMovieDetailsById(body: string) {
  console.group(body);
  return get(
    "/movie/" +
      body +
      "?api_key=" +
      "38420def7b59938da9d7eb52e657b924" +
      //   process.env.VUE_APP_API_KEY +
      "&language=en-US"
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
