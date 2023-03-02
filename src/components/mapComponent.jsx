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

const markers = [];
let coords = [];

function MapEventHandler({ onRenderMarker }) {
  const [markers, setMarkers] = useState([]);

  const map = useMapEvents({
    click(e) {
      map.locate();
      setMarkers((prevMarkers) =>
        prevMarkers.concat({
          key: `${e.latlng.lat}, ${e.latlng.lng}}`,
          coords: e.latlng,
        })
      );
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return markers.map((marker) => (
    <Marker key={marker.key} position={marker.coords}>
      <Popup>Hello</Popup>
    </Marker>
  ));
}

class Map extends Component {
  render() {
    return (
      <div id="map">
        <MapContainer
          center={COORDS}
          zoom={MAP_ZOOM_LEVEL}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={COORDS}>
            <Popup>Hello</Popup>
          </Marker>
          <MapEventHandler />
        </MapContainer>
      </div>
    );
  }
}

export default Map;
