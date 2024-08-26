import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import apiRequest from "../../lib/apiRequest";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";

function ProfileUpdatePage() {
  const { user, updateUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    try {
      setIsLoading(true)
      e.preventDefault();
      const formData = new FormData(e.target);

      const email = formData.get("email");
      const password = formData.get("password");
      const username = formData.get("username");


      const result = await apiRequest.put(`/user/${user.id}`, {
        email, password, username
      })

      updateUser(result.data)

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
          <img src={user.avatar || 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'}
            alt={user.username} className="avatar" />
        </div>
      </>
      }
    </div>
  );
}

export default ProfileUpdatePage;
