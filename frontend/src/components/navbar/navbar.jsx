import { useState } from "react";
import { NavLink } from "react-router";
import "./nav-bar.css";
import Logo from "../common/Logo/Logo";
import AuthModal from "../AuthModal/AuthModal";

function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <Logo className="navbar-logo" />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" end>
                  בית
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/aboutPage">
                  אודות
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/requests">
                  בקשות
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/offers">
                  תרומות
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/favorites">
                  מועדפים
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  ניהול משתמשים
                </NavLink>
              </li>
            </ul>

            <div className="profile-icon" onClick={() => setModalOpen(true)}>
              <i className="bi bi-person-circle"></i>
            </div>
          </div>
        </div>
      </nav>

      {modalOpen && <AuthModal closeModal={() => setModalOpen(false)} />}
    </>
  );
}

export default Navbar;
