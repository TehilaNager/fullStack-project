// import { useState } from "react";
// import { Link } from "react-router";
// import "./navbar.css";
// import Logo from "../common/logo/logo";
// import AuthModal from "../authModal/authModal";

// function Navbar() {
//   const [modalOpen, setModalOpen] = useState(false);

//   return (
//     <>
//       <nav className="navbar">
//         <div className="navbar-container">
//           <Logo />

//           <div className="nav-links">
//             <Link to="/">בית</Link>
//             <Link to="/about">אודות</Link>
//             <Link to="/requests-offers">בקשות ותרומות</Link>
//             <Link to="/personal-area">אזור אישי</Link>
//             <Link to="/favorites">מועדפים</Link>
//             <Link to="/admin">ניהול משתמשים</Link>
//           </div>

//           <div className="profile-icon" onClick={() => setModalOpen(true)}>
//             <i className="bi bi-person-circle"></i>
//           </div>
//         </div>
//       </nav>
//       {modalOpen && <AuthModal closeModal={() => setModalOpen(false)} />}
//     </>
//   );
// }

// export default Navbar;

// import { useState } from "react";
// import { Link } from "react-router";
// import "./navbar.css";
// import Logo from "../common/logo/logo";
// import AuthModal from "../authModal/authModal";

// function Navbar() {
//   const [modalOpen, setModalOpen] = useState(false);

//   return (
//     <>
//       <nav className="nav-wrapper-shield">
//         <div className="nav-inner">
//           <Logo />

//           <div className="nav-links">
//             <Link to="/">בית</Link>
//             <Link to="/about">אודות</Link>
//             <Link to="/requests-offers">בקשות ותרומות</Link>
//             <Link to="/personal-area">אזור אישי</Link>
//             <Link to="/favorites">מועדפים</Link>
//             <Link to="/admin">ניהול משתמשים</Link>
//           </div>

//           <div className="nav-profile" onClick={() => setModalOpen(true)}>
//             <i className="bi bi-person-fill"></i>
//           </div>
//         </div>

//         {/* המגן */}
//         <div className="nav-shield"></div>
//       </nav>

//       {modalOpen && <AuthModal closeModal={() => setModalOpen(false)} />}
//     </>
//   );
// }

// export default Navbar;

import { useState } from "react";
import { Link } from "react-router";
import "./navbar.css";
import Logo from "../common/logo/logo";
import AuthModal from "../authModal/authModal";

function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* RIGHT – Logo + Links */}
          <div className="navbar-right-links">
            <Logo className="navbar-logo" />
            <div className="nav-links">
              <Link to="/">בית</Link>
              <Link to="/about">אודות</Link>
              <Link to="/requests">בקשות</Link>
              <Link to="/offers">תרומות</Link>
              <Link to="/personal-area">אזור אישי</Link>
              <Link to="/favorites">מועדפים</Link>
              <Link to="/admin">ניהול משתמשים</Link>
            </div>
          </div>

          {/* LEFT – Profile Icon */}
          <div className="navbar-left">
            <div className="profile-icon" onClick={() => setModalOpen(true)}>
              <i className="bi bi-person-circle"></i>{" "}
              {/* אייקון Bootstrap יפה, מודרני */}
            </div>
          </div>
        </div>
      </nav>

      {modalOpen && <AuthModal closeModal={() => setModalOpen(false)} />}
    </>
  );
}

export default Navbar;
