import { useState } from "react";
import { NavLink, Link } from "react-router";
import "./nav-bar.css";
import Logo from "../common/Logo/Logo";
import { useAuth } from "../../context/authContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <header>
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
                <NavLink className="nav-link" to="/about">
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
              {/* להוסיף to="" */}
              <li className="nav-item">
                <NavLink className="nav-link">מועדפים</NavLink>
              </li>
              {/* להוסיף to="" */}
              <li className="nav-item">
                <NavLink className="nav-link">ניהול משתמשים</NavLink>
              </li>
            </ul>

            {user ? (
              <div
                className="dropdown text-center"
                style={{ display: "inline-block", position: "relative" }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1896/1896513.png"
                  alt="Profile"
                  className="dropdown-toggle mx-3"
                  data-bs-toggle="dropdown"
                  style={{
                    width: "50px",
                    cursor: "pointer",
                    borderRadius: "50%",
                  }}
                />
                <ul
                  className="dropdown-menu shadow text-center"
                  style={{
                    position: "absolute",
                    top: "60px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <li>
                    <Link
                      className="dropdown-item text-danger px-4 py-2"
                      to={`/edit-user/${user?._id}`}
                    >
                      עריכה
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item text-danger px-4 py-2"
                      to="/sign-out"
                    >
                      התנתק
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active" : "")
                    }
                    to="/sign-up"
                  >
                    הרשם
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active" : "")
                    }
                    to="/sign-in"
                  >
                    התחבר
                  </NavLink>
                </li>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
