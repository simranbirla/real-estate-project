import { userData } from "../../dummyData";
import "./chat.scss";

export default function Chat() {
  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        <div className="message">
          <img src={userData.img} alt={userData.name} />
          <span>{userData.name}</span>
          <p>Lorem ipsum dolor sit amet....</p>
        </div>
        <div className="message">
          <img src={userData.img} alt={userData.name} />
          <span>{userData.name}</span>
          <p>Lorem ipsum dolor sit amet....</p>
        </div>
        <div className="message">
          <img src={userData.img} alt={userData.name} />
          <span>{userData.name}</span>
          <p>Lorem ipsum dolor sit amet....</p>
        </div>
      </div>
      <div className="chatBox"></div>
    </div>
  );
}
