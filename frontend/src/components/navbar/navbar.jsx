import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router";
import { Collapse } from "bootstrap";
import { FaUserCircle } from "react-icons/fa";
import "./nav-bar.css";
import Logo from "../common/Logo/Logo";
import { useAuth } from "../../context/authContext";

function Navbar() {
  const { user } = useAuth();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const navbar = document.getElementById("mainNavbar");
      const toggler = document.querySelector(".navbar-toggler");

      const clickedInsideNavbar = navbar?.contains(e.target);
      const clickedToggle = toggler?.contains(e.target);

      if (!clickedInsideNavbar && !clickedToggle) {
        const bsCollapse = Collapse.getInstance(navbar);
        if (bsCollapse) bsCollapse.hide();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const dropdown = document.querySelector(".dropdown");

      if (dropdown && !dropdown.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeNavbar = () => {
    const navbar = document.getElementById("mainNavbar");

    if (!navbar) return;

    const bsCollapse =
      Collapse.getInstance(navbar) || new Collapse(navbar, { toggle: false });

    bsCollapse.hide();
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar">
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
                <NavLink className="nav-link" to="/" end onClick={closeNavbar}>
                  בית
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about" onClick={closeNavbar}>
                  אודות
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/requests"
                  onClick={closeNavbar}
                >
                  בקשות
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/offers"
                  onClick={closeNavbar}
                >
                  תרומות
                </NavLink>
              </li>
              {user && (
                <>
                  <li className="nav-item" title="המועדפים שלי">
                    <NavLink
                      to="/favorites"
                      className="nav-link"
                      onClick={closeNavbar}
                    >
                      מועדפים
                    </NavLink>
                  </li>
                  <li className="nav-item" title="התרומות והבקשות שלי">
                    <NavLink
                      to="/my-items"
                      className="nav-link"
                      onClick={closeNavbar}
                    >
                      שלי
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/messages"
                      className="nav-link"
                      onClick={closeNavbar}
                    >
                      הודעות
                    </NavLink>
                  </li>
                </>
              )}
              {user?.role === "admin" && (
                <li className="nav-item">
                  <NavLink
                    to="/users"
                    className="nav-link"
                    onClick={closeNavbar}
                  >
                    ניהול משתמשים
                  </NavLink>
                </li>
              )}
            </ul>

            {user ? (
              <div className="dropdown text-center">
                <button
                  className="btn p-0 border-0 bg-transparent"
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                >
                  <FaUserCircle className="profile-icon" />
                </button>

                {isProfileDropdownOpen && (
                  <ul
                    className="dropdown-menu shadow text-center show"
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
                        to={`/details-user/${user?._id}`}
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        אזור אישי
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-danger px-4 py-2"
                        to="/sign-out"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        התנתקות
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <div className="auth-group">
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      "nav-link auth-btn signup-btn" +
                      (isActive ? " active" : "")
                    }
                    to="/sign-up"
                    onClick={closeNavbar}
                  >
                    הרשם
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      "nav-link auth-btn login-btn" +
                      (isActive ? " active" : "")
                    }
                    to="/sign-in"
                    onClick={closeNavbar}
                  >
                    התחבר
                  </NavLink>
                </li>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
