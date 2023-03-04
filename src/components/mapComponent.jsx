import { Icon } from "leaflet";
import React, { Component, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import WorkoutForm from "./workoutFormComponent";
import { MAP_ZOOM_LEVEL, COORDS } from "../config";
import "../css/style.css";

const customIcon = new Icon({
  iconUrl: require("../img/marker-icon.png"),
  iconSize: [38, 38],
});

function MapEventHandler({ markers, addMarker }) {
  // const [renderMarkers, setRenderMarkers] = useState(null);
  const map = useMapEvents({
    click(e) {
      map.locate();
      addMarker(e, customIcon);
      // setRenderMarkers(markers);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return markers === null
    ? null
    : markers.map((marker) => (
        <Marker key={marker.key} position={marker.coords} icon={customIcon}>
          {console.log("Markers: ", marker.coords)}
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
          {/* Default */}
          {/* <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}
          {/* Jawg.dark */}
          {/* <TileLayer
            attribution='<a href="http:url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" //jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}"
            accessToken="oAWFbGge6rAM4G7XaDxi34ZkmDxc7QSadqOBBGci1RGjwmZ49Yd2zibsUCsHGl1j"
          /> */}
          <TileLayer
            attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token={accessToken}"
            accessToken="oAWFbGge6rAM4G7XaDxi34ZkmDxc7QSadqOBBGci1RGjwmZ49Yd2zibsUCsHGl1j"
          />
          <MapEventHandler
            markers={this.props.markers}
            addMarker={this.props.addMarker}
          />
        </MapContainer>
      </div>
    );
  }
}

export default Map;
