import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import apiRequest from '../../lib/apiRequest.js';

function Register() {

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true)
      e.preventDefault()

      const formData = new FormData(e.target)

      const username = formData.get("username")
      const email = formData.get("email")
      const password = formData.get("password")

      console.log(username, email, password)

      const result = await apiRequest.post("/auth/register", {
        username, email, password
      })


      navigate("/login")
    } catch (e) {
      setError(e.response.data.error ?? "Something went wrong")
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <div className="register">
      {isLoading ? <div className="loading">Loading</div> : <><div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button >Register</button>
          <Link to="/login">Do you have an account?</Link>
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

export default Register;
