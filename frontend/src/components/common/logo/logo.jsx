// import { Link } from "react-router";
// import "./logo.css";

// function Logo() {
//   return (
//     <Link to="/" className="logo">
//       <div className="logo-circle">
//         <div className="logo-icon">⚔️</div>
//       </div>

//       <div className="logo-text-group">
//         <div className="logo-title">חבר ללוחם</div>
//         <div className="logo-sub">קהילה למען החיילים</div>
//       </div>
//     </Link>
//   );
// }

// export default Logo;

import { Link } from "react-router";
import "./logo.css";

function Logo() {
  return (
    <Link to="/" className="logo modern-logo">
      <div className="shield-icon">
        <svg
          viewBox="0 0 64 64"
          className="shield-svg"
          fill="none"
          strokeWidth="3"
        >
          <path
            d="M32 4 L56 14 V30 C56 45 46 57 32 60 C18 57 8 45 8 30 V14 Z"
            stroke="currentColor"
          />
          <path
            d="M16 32 C22 22, 42 22, 48 32"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="logo-text-group">
        <div className="logo-title">חבר ללוחם</div>
        <div className="logo-sub">קהילה למען החיילים</div>
      </div>
    </Link>
  );
}

export default Logo;
