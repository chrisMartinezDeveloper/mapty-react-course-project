import React, { Component, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
// import { L } from "leaflet";
import { MAP_ZOOM_LEVEL, COORDS } from "../config";
import "../css/style.css";

function MapEventHandler(props) {
  const markers = [];
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e) {
      map.locate();
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return position === null ? null : (
    <Marker position={position}>
      <Popup>Hello</Popup>
    </Marker>
  );
}

function Map(props) {
  return (
    <MapContainer center={COORDS} zoom={MAP_ZOOM_LEVEL} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEventHandler onShowForm={props.onShowForm} />
    </MapContainer>
  );
}

export default Map;
