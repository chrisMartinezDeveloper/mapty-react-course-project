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

function MapEventHandler(props) {
  const [position, setPosition] = useState(null);
  let marker;
  const map = useMapEvents({
    click(e) {
      // coords = e.latlng;
      map.locate();
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      marker = props.onRenderMarker(e.latlng);
      // console.log("TEST - Click");
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  console.log("Marker: ", marker);
  return marker;
  // return position === null ? null : (
  //   <Marker position={position}>
  //     <Popup>Hello</Popup>
  //   </Marker>
  // );
}

// function RenderMarker(coords) {
//   console.log("TEST - render marker");
//   console.log(coords);

//   return <Marker position={coords}></Marker>;
// }

class Map extends Component {
  RenderMarker(coords) {
    console.log("TEST - render marker");
    console.log(coords);
    let marker = <Marker position={coords}></Marker>;

    return marker;
  }

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
          <MapEventHandler onRenderMarker={this.RenderMarker} />
          {}
          {/* {this.setState(RenderMarker(coords))} */}
          {/* {markers.map((marker) =>
        // <Marker position={marker.coords}></Marker>
        RenderMarker(marker.coords)
      )} */}
        </MapContainer>
      </div>
    );
  }
}

export default Map;
