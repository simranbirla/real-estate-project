import { CiBookmark, CiLocationOn } from "react-icons/ci";
import { TfiCommentAlt } from "react-icons/tfi";
import { Link } from "react-router-dom";
import "./card.scss";
import { LuBath } from "react-icons/lu";
import { FaBed } from "react-icons/fa";

export type TCardProps = {
  id: number;
  title: string;
  img: string;
  bedroom: number;
  bathroom: number;
  price: number;
  address: string;
  latitude: number;
  longitude: number;
};

export default function Card({
  id,
  title,
  img,
  bedroom,
  bathroom,
  price,
  address,
}: TCardProps) {
  return (
    <div className="card">
      <div className="imgContainer">
        <Link to={`/property/${id}`}>
          <img src={img} alt={title} />
        </Link>
      </div>
      <div className="detailContainer">
        <h2>Apartment {id}</h2>
        <div className="address">
          <span>
            <CiLocationOn />
          </span>{" "}
          {address}
        </div>
        <div className="price">
          <p>${price}</p>
        </div>
        <div className="bottomDetails">
          <div className="info">
            <p className="tag">
              <span>
                <LuBath />
              </span>
              {bedroom} bedroom
            </p>

            <p className="tag">
              <FaBed />
              {bathroom} bathroom
            </p>
          </div>
          <div className="action">
            <div className="actionWrapper">
              <CiBookmark />
            </div>
            <div className="actionWrapper">
              <TfiCommentAlt />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
