import { useState } from "react";
import { texts, userData } from "../../dummyData";
import "./chat.scss";

export default function Chat() {
  const [showChat, setShowChat] = useState<boolean>(false);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        <div className="message" onClick={() => setShowChat(true)}>
          <img src={userData.img} alt={userData.name} />
          <span>{userData.name}</span>
          <p>Lorem ipsum dolor sit amet....</p>
        </div>
        <div className="message" onClick={() => setShowChat(true)}>
          <img src={userData.img} alt={userData.name} />
          <span>{userData.name}</span>
          <p>Lorem ipsum dolor sit amet....</p>
        </div>
        <div className="message" onClick={() => setShowChat(true)}>
          <img src={userData.img} alt={userData.name} />
          <span>{userData.name}</span>
          <p>Lorem ipsum dolor sit amet....</p>
        </div>
      </div>
      {showChat && (
        <div className="chatBox">
          <div className="top">
            <img src={userData.img} alt={userData.name} />
            <span>{userData.name}</span>
            <div className="close" onClick={() => setShowChat(false)}>
              X
            </div>
          </div>
          <div className="middle">
            {texts.map((text) => {
              return (
                <div className={`text ${text.user ? "own" : "receive"}`}>
                  <p>{text.message}</p>
                  <span>{text.time}</span>
                </div>
              );
            })}
          </div>
          <div className="bottom">
            <input type="text" title="Enter the message" />
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
