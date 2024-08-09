import { LatLngTuple } from "leaflet";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { Link } from "react-router-dom";
import "./popup.scss";

export type TPopup = {
  id: number;
  position: LatLngTuple;
  title: string;
  img: string;
  bedroom: number;
  price: number;
};

export default function PopupMap({
  position,
  title,
  bedroom,
  img,
  price,
  id,
}: TPopup) {
  return (
    <Marker position={position}>
      <Popup>
        <div className="popContainer">
          <div className="imgContainer">
            <img src={img} alt={title} />
          </div>
          <div className="infoContainer">
            <Link className="title" to={`/property/${id}`}>
              {title}
            </Link>
            <span>{bedroom} bedrooms</span>
            <b>${price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
