import Slider from "../slider/Slider";
import "./prop.scss";
import { singlePostData, userData } from "../../dummyData";
import { CiBookmark, CiLocationOn } from "react-icons/ci";
import { FaBed, FaBus, FaHotel, FaSchool, FaTools } from "react-icons/fa";
import { MdOutlineMessage, MdOutlinePets } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { SlSizeFullscreen } from "react-icons/sl";
import { LuBath } from "react-icons/lu";
import GenericMap from "../map/GenericMap";

export default function SingleProp() {
  return (
    <div className="prop">
      <div className="details">
        <div className="wrapper">
          <Slider images={singlePostData.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <div className="address">
                  <CiLocationOn />
                  {singlePostData.address}
                </div>
                <div className="price">${singlePostData.price}</div>
              </div>

              <div className="user">
                <img src={userData.img} alt={userData.name} />
                <p>{userData.name}</p>
              </div>
            </div>
            <div className="bottom">{singlePostData.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <div className="info">
            <div className="title">General</div>
            <div className="generalContainer">
              <div className="container">
                <div className="icon">
                  <FaTools />
                </div>
                <div className="general">
                  <h3 className="text">Utilities</h3>
                  <p className="subtext">Renter is responsible</p>
                </div>
              </div>
              <div className="container">
                <div className="icon">
                  <MdOutlinePets />
                </div>
                <div className="general">
                  <h3 className="text">Pets Policy</h3>
                  <p className="subtext">Pets are allowed</p>
                </div>
              </div>
              <div className="container">
                <div className="icon">
                  <GiTakeMyMoney />
                </div>
                <div className="general">
                  <h3 className="text">Property Fees</h3>
                  <p className="subtext">
                    Must have 3x rent in total household income
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="info">
            <div className="title">Room Sizes</div>
            <div className="roomContainer">
              <div className="room">
                <SlSizeFullscreen />
                {singlePostData.bathroom}sqft
              </div>

              <div className="room">
                <FaBed />
                {singlePostData.bedRooms} bedrooms
              </div>

              <div className="room">
                <LuBath />
                {singlePostData.bathroom} bathrooms
              </div>
            </div>
          </div>
          <div className="info">
            <div className="title">Nearby Places</div>
            <div className="placeContainer">
              <div className="places">
                <FaSchool />
                <div className="sub-text">
                  School
                  <p> {singlePostData.school}</p>
                </div>
              </div>
              <div className="places">
                <FaBus />
                <div className="sub-text">
                  Bus
                  <p> {singlePostData.bus}</p>
                </div>
              </div>
              <div className="places">
                <FaHotel />
                <div className="sub-text">
                  Restaurants
                  <p> {singlePostData.restaurant}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="info">
            <div className="title">Location</div>
            <div className="mapContainer">
              <GenericMap
                position={[singlePostData.latitude, singlePostData.longitude]}
                address={singlePostData.address}
              />
            </div>
          </div>
          <div className="actions">
            <button name="msg">
              <MdOutlineMessage />
              Send a Message
            </button>
            <button name="bookmark">
              <CiBookmark />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
