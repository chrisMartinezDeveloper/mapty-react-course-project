import React, { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { MAP_ZOOM_LEVEL, COORDS } from "../config";
import "../css/style.css";

class Map extends Component {
  render() {
    return (
      <MapContainer
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
}

export default Map;
