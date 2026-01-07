import "./logo.css";
import ShieldIcon from "../../../images/shield.png";
function Logo() {
  return (
    <div className="logo-container">
      <img src={ShieldIcon} alt="מגן לוחם" className="logo-icon" />
      <div className="logo-text">
        <h1 className="logo-main">חבר ללוחם</h1>
        <p className="logo-sub">קהילה למען החיילים</p>
      </div>
    </div>
  );
}

export default Logo;
