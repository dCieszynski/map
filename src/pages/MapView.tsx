import React, { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import useRouteGeocodes from "../hooks/useRouteGeocodes";
import Map from "../components/Map";
import { getFullRoute, getRoute } from "../api";
import { decode } from "../utils/flexiblePolyline";
import RouteInfo from "../components/RouteInfo";
import { TGeoPosition, TPolyline, TRoutesResponse, TRouteNoticesResponse } from "../types";

export const isRouteResponseError = (response: TRoutesResponse | TRouteNoticesResponse): response is TRouteNoticesResponse => {
  return response && typeof response === "object" && "notices" in response;
};

function MapView() {
  const { routesGeocodes } = useRouteGeocodes();
  const [errorMessage, setErrorMessage] = useState("");
  const [routePolyline, setRoutePolyline] = useState<number[][]>([]);
  const [routeLength, setRouteLength] = useState(0);

  const navigate = useNavigate();

  const getPolyline = (start: TGeoPosition, end: TGeoPosition, polyline: string) => {
    const decodedPolyline = decode(polyline);
    const fullRoutePolyline = [[start.lat, start.lng], ...decodedPolyline.polyline, [end.lat, end.lng]];
    setRoutePolyline(fullRoutePolyline);
    return decodedPolyline;
  };

  const handleRouteLength = async (decodedPolyline: TPolyline) => {
    const data = await getFullRoute({ trace: decodedPolyline.polyline });
    const length = data.routes[0].sections.map((route) => {
      return route.summary.length;
    });
    setRouteLength(length.reduce((previousValue, currentValue) => previousValue + currentValue, 0));
  };

  const handleRoute = useCallback(async () => {
    if (routesGeocodes) {
      const start: TGeoPosition = routesGeocodes.start.position;
      const end: TGeoPosition = routesGeocodes.end.position;
      const data = await getRoute(`${start.lat},${start.lng}`, `${end.lat},${end.lng}`);
      if (!isRouteResponseError(data)) {
        const polyline: TPolyline = getPolyline(start, end, data.routes[0].sections[0].polyline);
        await handleRouteLength(polyline);
      } else {
        setErrorMessage(data.notices[0].title);
      }
    }
  }, [routesGeocodes]);

  useEffect(() => {
    handleRoute();
  }, [handleRoute]);

  if (routesGeocodes === null) return <Navigate to="/" />;

  return (
    <div>
      <button type="button" onClick={() => navigate(-1)}>
        Back
      </button>
      <h1 className="header">Map view</h1>
      {errorMessage.length > 1 ? (
        <div>{errorMessage}</div>
      ) : (
        <>
          <Map origin={routesGeocodes.start} destination={routesGeocodes.end} routePolyline={routePolyline} />
          <RouteInfo start={routesGeocodes.start.title} end={routesGeocodes.end.title} routeLength={routeLength} />
        </>
      )}
    </div>
  );
}

export default MapView;
