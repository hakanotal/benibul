import { env } from "../../env/client.mjs";

const API_URL = env.NEXT_PUBLIC_W3W_API_URL;
const API_KEY = env.NEXT_PUBLIC_W3W_API_KEY;

export async function convertCoordsTo3Words(lat:number, lng:number) {
    const response = await fetch(
      API_URL +
        "/convert-to-3wa?coordinates=" +
        lat +
        "," +
        lng +
        "&key=" +
        API_KEY +
        "&format=json&language=tr"
    ).then((res) => res.json());
    if (response.error) throw response.error;
    return response;
}

export async function convert3WordsToCoords(words:string) {
    const response = await fetch(
      API_URL +
        "/convert-to-coordinates?words=" +
        words +
        "&key=" +
        API_KEY +
        "&format=geojson"
    ).then((res) => res.json());
    if (response.error) throw response.error;
    return response;
}