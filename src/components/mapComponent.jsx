import React, { Component } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { L } from "leaflet";
import icon from "./constants";
import { MAP_ZOOM_LEVEL, COORDS } from "../config";
import "../css/style.css";

function Map() {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      L.marker([lat, lng], { icon }).addTo(map);
    },
  });

  return (
    <MapContainer
      onClick={this.props.onShowForm}
      center={COORDS}
      zoom={MAP_ZOOM_LEVEL}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default Map;
