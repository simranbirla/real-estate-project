import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.scss";
import { MapContainer } from "react-leaflet/MapContainer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { TileLayer } from "react-leaflet/TileLayer";
import { TCardProps } from "../card/Card";
import PopupMap from "../popup/Popup";

const position = [51.505, -0.09] as LatLngTuple;

export default function Map({ places }: { places: TCardProps[] }) {
  return (
    <MapContainer
      center={position}
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place) => (
        <PopupMap
          position={[place.latitude, place.longitude]}
          key={place.id}
          id={place.id}
          title={place.title}
          img={place.img}
          price={place.price}
          bedroom={place.bedroom}
        />
      ))}
    </MapContainer>
  );
}
