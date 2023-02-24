import { TGeocodeResponse, TRouteNoticesResponse, TRoutesResponse, TTrace } from "./types";

export const getGeocoordinates = async (query: string): Promise<TGeocodeResponse> => {
  const response = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${query}&apiKey=bVey4SWIbkTYRsOy_KF9dBqkuvXKZxP1JczlCtm_694`);

  const resData = await response.json();

  return resData;
};

export const getRoute = async (origin: string, destination: string): Promise<TRoutesResponse | TRouteNoticesResponse> => {
  const response = await fetch(
    `https://router.hereapi.com/v8/routes?transportMode=car&origin=${origin}&destination=${destination}&return=summary,polyline&apikey=bVey4SWIbkTYRsOy_KF9dBqkuvXKZxP1JczlCtm_694`
  );

  const resData = await response.json();

  return resData;
};

export const getFullRoute = async (trace: TTrace): Promise<TRoutesResponse> => {
  const response = await fetch(
    `https://router.hereapi.com/v8/import?apikey=bVey4SWIbkTYRsOy_KF9dBqkuvXKZxP1JczlCtm_694&return=summary&transportMode=car`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trace),
    }
  );

  const resData = await response.json();

  return resData;
};
