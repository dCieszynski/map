import React, { createContext, PropsWithChildren, useMemo, useState } from "react";

import { TRouteGeocodes } from "../types";

export type THistoryContext = {
  routes: TRouteGeocodes[];
  addRoute: (route: TRouteGeocodes) => void;
};

const HistoryContext = createContext<THistoryContext>({
  routes: [],
  addRoute: () => {},
});

export function HistoryProvider({ children }: PropsWithChildren) {
  const [routes, setRoutes] = useState<TRouteGeocodes[]>([]);

  const addRoute = (route: TRouteGeocodes) => {
    setRoutes((prevRoutes) => [...prevRoutes, route]);
  };

  const historyValue = useMemo(
    () => ({
      routes,
      addRoute,
    }),
    [routes]
  );

  return <HistoryContext.Provider value={historyValue}>{children}</HistoryContext.Provider>;
}

export default HistoryContext;
