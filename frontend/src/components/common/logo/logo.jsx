import { Link } from "react-router";
import "./logo.css";
import logo from "../../../images/logoo.png";

function Logo() {
  return (
    <Link to="/" className="logo">
      <img src={logo} alt="logo" />

      <div>
        <div className="logo-text">חבר ללוחם</div>
        <div className="logo-subtext">קהילה למען החיילים</div>
      </div>
    </Link>
  );
}

export default Logo;
