import { useContext } from "react";
import RoutesGeocodesContext from "../storage/RouteGeocodesProvider";

function useRouteGeocodes() {
  return useContext(RoutesGeocodesContext);
}

export default useRouteGeocodes;
