import apiRequest from "../../lib/apiRequest.js";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import { useNavigate, Link, useLoaderData, Await } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { DEFAULT_IMAGE } from "../../constants/image.js";

function ProfilePage() {

  const navigate = useNavigate()
  const results = useLoaderData()

  const { user, updateUser } = useContext(AuthContext)


  const handleLogout = async () => {
    try {

      await apiRequest.post("/auth/logout");

      updateUser(null)

      navigate("/")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button onClick={() => navigate("/update-profile")}>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={user.avatar || DEFAULT_IMAGE}
                alt={user.username}
              />
            </span>
            <span>
              Username: <b>{user.username}</b>
            </span>
            <span>
              E-mail: <b>{user.email}</b>
            </span>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add-post">
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading</p>}>
            <Await
              resolve={results.listResponse}
              errorElement={
                <p>Error loading package location!</p>
              }
            >
              {(listResponse) => {
                return listResponse.data?.data?.posts.length > 0 ?
                  <List posts={listResponse.data?.data?.posts ?? []} />
                  : <div>Add New Posts</div>
              }}
            </Await>
          </Suspense>

          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading</p>}>
            <Await
              resolve={results.listResponse}
              errorElement={
                <p>Error loading package location!</p>
              }
            >
              {(listResponse) => {
                return listResponse.data?.data?.savedPosts.length > 0 ?
                  <List posts={listResponse.data?.data?.posts ?? []} />
                  : <div>Add New Posts</div>
              }}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
