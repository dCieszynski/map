export type TGeocodeResponse = {
  items: {
    access: { lat: number; lng: number }[];
    address: {
      city: string;
      countryCode: string;
      countryName: string;
      county: string;
      district: string;
      houseNumber: string;
      label: string;
      postalCode: string;
      state: string;
      street: string;
    };
    houseNumberType: string;
    id: string;
    mapView: {
      east: number;
      north: number;
      south: number;
      west: number;
    };
    position: {
      lat: number;
      lng: number;
    };
    resultType: string;
    scoring: {
      fieldScore: {
        city: number;
        houseNumber: number;
        streets: number[];
      };
      queryScore: number;
    };
    title: string;
  }[];
};

export type TGeocode = {
  access: { lat: number; lng: number }[];
  address: {
    city: string;
    countryCode: string;
    countryName: string;
    county: string;
    district: string;
    houseNumber: string;
    label: string;
    postalCode: string;
    state: string;
    street: string;
  };
  houseNumberType: string;
  id: string;
  mapView: {
    east: number;
    north: number;
    south: number;
    west: number;
  };
  position: {
    lat: number;
    lng: number;
  };
  resultType: string;
  scoring: {
    fieldScore: {
      city: number;
      houseNumber: number;
      streets: number[];
    };
    queryScore: number;
  };
  title: string;
};

export type TRouteGeocodes = {
  start: TGeocode;
  end: TGeocode;
};

export type TRoutesResponse = {
  routes: {
    id: string;
    sections: {
      id: string;
      type: string;
      departure: {
        place: {
          type: string;
          location: {
            lat: number;
            lng: number;
          };
        };
        originalLocation: {
          lat: number;
          lng: number;
        };
      };
      arrival: {
        place: {
          type: string;
          location: {
            lat: number;
            lng: number;
          };
          originalLocation: {
            lat: number;
            lng: number;
          };
        };
      };
      polyline: string;
      summary: {
        duration: number;
        length: number;
        baseDuration: number;
      };
      transport: {
        mode: string;
      };
    }[];
  }[];
};

export type TRouteNoticesResponse = {
  notices: {
    title: string;
    code: string;
  }[];
  routes: TRoutesResponse[];
};

export type TPolyline = {
  polyline: number[][];
  precision: number;
  thirdDim: number;
  thirdDimPrecision: number;
};

export type TGeoPosition = {
  lat: number;
  lng: number;
};

export type TTrace = {
  trace: number[][];
};

export type TFormValues = {
  start: string;
  end: string;
};
