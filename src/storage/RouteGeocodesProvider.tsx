import React, { createContext, PropsWithChildren, useMemo, useState } from "react";

import { TGeocode, TRouteGeocodes } from "../types";

export type TRouteGeocodesContext = {
  routesGeocodes: TRouteGeocodes | null;
  setCodes: (start: TGeocode, end: TGeocode) => void;
  removeCodes: () => void;
};

const RoutesGeocodesContext = createContext<TRouteGeocodesContext>({
  routesGeocodes: null,
  setCodes: () => {},
  removeCodes: () => {},
});

export function RouteGeocodesProvider({ children }: PropsWithChildren) {
  const [routesGeocodes, setRoutesGeocodes] = useState<TRouteGeocodes | null>(null);

  const setCodes = (start: TGeocode, end: TGeocode) => {
    setRoutesGeocodes({ start, end });
  };

  const removeCodes = () => {
    setRoutesGeocodes(null);
  };

  const routesGeocodesValue = useMemo(() => ({ routesGeocodes, setCodes, removeCodes }), [routesGeocodes]);

  return <RoutesGeocodesContext.Provider value={routesGeocodesValue}>{children}</RoutesGeocodesContext.Provider>;
}

export default RoutesGeocodesContext;
