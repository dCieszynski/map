import React from "react";
import { useNavigate } from "react-router-dom";

import useRouteGeocodes from "../hooks/useRouteGeocodes";
import { TGeocode, TRouteGeocodes } from "../types";

type Props = {
  routes: TRouteGeocodes[];
};

function RoutesHistory({ routes }: Props) {
  const { setCodes } = useRouteGeocodes();
  const navigate = useNavigate();

  const handleRoute = async (start: TGeocode, end: TGeocode) => {
    setCodes(start, end);
    navigate("/map");
  };

  return (
    <div>
      <h2 className="header">History</h2>
      {routes.map((route) => {
        return (
          <div key={`${route.start.id}${route.end.id}`} className="history-container">
            <div className="history-info">From: {route.start.title}</div>
            <div className="history-info">To: {route.end.title}</div>
            <button type="button" className="history-btn" onClick={() => handleRoute(route.start, route.end)}>
              Get route
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default RoutesHistory;
