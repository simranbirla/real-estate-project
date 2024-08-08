import { Outlet } from "react-router";
import "./layout.scss";
import Navbar from "../navbar/Navbar";

export default function Layout() {
  return (
    <div className="layout">
      <div className="navigation">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
