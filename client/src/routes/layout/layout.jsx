import "./layout.scss";
import Navbar from "../../components/navbar/Navbar"
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function Layout({ children }) {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
}


export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user])

  return (
    user && <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default Layout;
