import { useState, useContext } from "react";
import apiRequest from "../../lib/apiRequest.js";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

function Login() {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false);


  const { user, updateUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true)
      e.preventDefault()

      const formData = new FormData(e.target)

      const username = formData.get("username")
      const password = formData.get("password")

      const result = await apiRequest.post("/auth/login", {
        username, password
      })

      updateUser(result.data?.user)

      navigate("/")
    } catch (e) {
      console.log(e)
      setError(e.response?.data.error ?? "Error")
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <div className="login">
      {isLoading ? <div className="loading">Loading</div> : <><div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button>Login</button>
          <Link to="/register">{"Don't"} you have an account?</Link>
          {error && <span>{error}</span>}
        </form>
      </div>
        <div className="imgContainer">
          <img src="/bg.png" alt="" />
        </div>
      </>
      }
    </div>
  );
}

export default Login;
