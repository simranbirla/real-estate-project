import Slider from "../slider/Slider";
import "./prop.scss";
import { singlePostData, userData } from "../../dummyData";
import { CiLocationOn } from "react-icons/ci";

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
        <div className="wrapper"></div>
      </div>
    </div>
  );
}
