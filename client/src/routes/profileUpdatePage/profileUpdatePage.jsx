import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import apiRequest from "../../lib/apiRequest";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import UploadWidget from "../../components/uploadWidget/UploadWidget.jsx";
import { DEFAULT_IMAGE } from "../../constants/image";

function ProfileUpdatePage() {
  const { user, updateUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar)


  useEffect(() => {
    setAvatar(user.avatar)
  }, [user])


  const handleSubmit = async (e) => {
    try {
      setIsLoading(true)
      e.preventDefault();
      const formData = new FormData(e.target);

      const email = formData.get("email");
      const password = formData.get("password");
      const username = formData.get("username");


      const result = await apiRequest.put(`/user/${user.id}`, {
        email, password, username, avatar: avatar
      })

      updateUser(result.data?.data)

      navigate("/profile")

    } catch (e) {
      console.log(e)
      setError(e.response?.data.error ?? "Error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="profileUpdatePage">
      {isLoading ? <div className="loading">Loading</div> : <><div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={user.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          <span>{error}</span>
        </form>
      </div>
        <div className="sideContainer">
          <img src={avatar || DEFAULT_IMAGE}
            alt={user.username} className="avatar" />
          <UploadWidget uwConfig={{ cloudName: "djuhxxsmh", uploadPreset: "estate", multiple: false, maxImageFileSize: 2000000, folder: "avatars" }}
            setAvatar={setAvatar}
          />
        </div>
      </>
      }
    </div>
  );
}

export default ProfileUpdatePage;
