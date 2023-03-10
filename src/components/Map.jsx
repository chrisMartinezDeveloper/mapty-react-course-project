import { Icon } from "leaflet";
import { Component, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import { MAP_ZOOM_LEVEL, COORDS } from "../config";

const customIcon = new Icon({
  iconUrl: require("../img/marker-icon.png"),
  iconSize: [38, 38],
});

function MapEventHandler({
  shouldShowForm,
  markers,
  addMarker,
  showForm,
  shouldFlyToMarker,
}) {
  const [, setRenderMarkers] = useState(0);
  const map = useMapEvents({
    click(e) {
      if (!shouldShowForm) {
        map.locate();
        addMarker(e);
        setRenderMarkers((prevFnMarkers) => prevFnMarkers + 1);

        map.flyTo(e.latlng, map.getZoom());

        showForm();
      }
    },
  });

  shouldFlyToMarker[0] && map.flyTo(shouldFlyToMarker[1], map.getZoom());

  return markers.map((marker) => (
    <Marker key={marker.key} position={marker.coords} icon={customIcon}>
      <Popup>Hello</Popup>
    </Marker>
  ));
}

export default class Map extends Component {
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
            showForm={this.props.showForm}
            shouldShowForm={this.props.shouldShowForm}
            markers={this.props.markers}
            addMarker={this.props.addMarker}
            shouldFlyToMarker={this.props.shouldFlyToMarker}
            resetShouldFlyToMarker={this.props.resetShouldFlyToMarker}
          />
        </MapContainer>
      </div>
    );
  }
}
