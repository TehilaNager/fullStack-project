import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <h3 className="footer-logo">חבר ללוחם</h3>

        <p className="footer-text">
          פלטפורמה קהילתית לחיבור, נתינה ותמיכה בחיילים ובמילואימניקים.
        </p>

        <nav className="footer-links">
          <a href="/">בית</a>
          <a href="/about">אודות</a>
          <a href="/requests">בקשות</a>
          <a href="/offers">תרומות</a>
        </nav>

        <span className="footer-note">
          פרויקט הדגמה במסגרת לימודי Full Stack
        </span>
      </div>

      <div className="footer-bottom">© 2026 חבר ללוחם | כל הזכויות שמורות</div>
    </footer>
  );
}

export default Footer;
