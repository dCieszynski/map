import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L, { Icon, IconOptions, LatLngExpression } from "leaflet";

import { TGeocode } from "../types";
import makerStartUrl from "../assets/markerStart.svg";
import makerEndUrl from "../assets/markerEnd.svg";

type Props = {
  origin: TGeocode;
  destination: TGeocode;
  routePolyline: number[][];
};

function Map({ origin, destination, routePolyline }: Props) {
  const polylineOptions = { color: "green" };

  const startIcon = L.icon({
    iconUrl: makerStartUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const endIcon = L.icon({
    iconUrl: makerEndUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <div>
      <MapContainer center={[origin.position.lat, origin.position.lng] as LatLngExpression} zoom={13} scrollWheelZoom={false} className="map">
        <>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker icon={startIcon} position={[origin.position.lat, origin.position.lng] as LatLngExpression}>
            <Popup>{origin.title}</Popup>
          </Marker>
          <Marker icon={endIcon} position={[destination.position.lat, destination.position.lng] as LatLngExpression}>
            <Popup>{destination.title}</Popup>
          </Marker>
          <Polyline pathOptions={polylineOptions} positions={routePolyline as LatLngExpression[]} />
        </>
      </MapContainer>
    </div>
  );
}

export default Map;
