import { useState } from "react";
import { Link } from "react-router";
import "./navbar.css";
import Logo from "../common/logo/logo";
import AuthModal from "../authModal/authModal";

function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-white bg-army">
        <div className="container">
          <Logo />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupport"
            aria-controls="navbarSupport"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link to="/">בית</Link>
          <Link to="/about">אודות</Link>
          <Link to="/requests-donations">תרומות ובקשות</Link>

          <div
            onClick={() => setModalOpen(true)}
            style={{ cursor: "pointer", marginLeft: "auto" }}
          >
            <i className="bi bi-person-circle"></i>
          </div>
        </div>
      </nav>
      {modalOpen && <AuthModal closeModal={() => setModalOpen(false)} />}
    </>
  );
}

export default Navbar;
