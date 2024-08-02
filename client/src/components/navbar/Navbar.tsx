import { useState } from "react";
import "./navbar.scss";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav>
      <div className="left-side">
        <a href="/" className="logo">
          <div>Logo</div>
          <span>Real Estate App</span>
        </a>
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/agents">Agents</a>
      </div>

      <div className="right-side">
        <a href="/sign-in" className="sign-in">
          Sign In
        </a>
        <a href="/sign-up" className="sign-up">
          Sign Up
        </a>
      </div>

      <div
        className={`menu-button ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <GiHamburgerMenu />
      </div>

      <div className={`horizontal-nav ${isOpen ? "open" : ""}`}>
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/agents">Agents</a>
        <a href="/sign-in">Sign In</a>
        <a href="/sign-up">Sign Up</a>
      </div>
    </nav>
  );
}
