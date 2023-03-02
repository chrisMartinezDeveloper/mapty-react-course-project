import React, { Component } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
// import { L } from "leaflet";
import { MAP_ZOOM_LEVEL, COORDS } from "../config";
import "../css/style.css";

function MapEventHandler(showForm) {
  const map = useMapEvents({
    click: (e) => {
      console.log(this.props);
    },
  });
  return null;
}

function Map() {
  return (
    <MapContainer center={COORDS} zoom={MAP_ZOOM_LEVEL} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEventHandler onShowForm={() => console.log("TEST - Map")} />
    </MapContainer>
  );
}

export default Map;
