import { listData, userData } from "../../dummyData";
import Card from "../card/Card";
import "./profilePage.scss";

export default function ProfilePage() {
  return (
    <div className="profile">
      <div className="userInfo">
        <div className="user">
          <img src={userData.img} alt={userData.name} />
          <h3>{userData.name}</h3>
        </div>
        <div className="propList">
          <h1>List</h1>
          <div className="listCards">
            {listData.map((data) => (
              <Card
                key={data.id}
                img={data.img}
                id={data.id}
                address={data.address}
                bathroom={data.bathroom}
                bedroom={data.bedroom}
                title={data.title}
                latitude={data.latitude}
                longitude={data.longitude}
                price={data.price}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="messages">Messages</div>
    </div>
  );
}
