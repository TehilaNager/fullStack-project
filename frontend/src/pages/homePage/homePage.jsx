import { Link } from "react-router";
import "./homePage.css";
import backgroundImg from "../../images/soldiers.png";

function HomePage() {
  return (
    <div className="home-page">
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="overlay">
          <div className="hero-content">
            <h1 className="main-title">חבר ללוחם</h1>
            <p className="subtitle">קהילה למען חיילים ואנשי מילואים</p>
            {/* <div className="hero-buttons">
              <Link to="/requests-donations" className="btn primary">
                צפו בבקשות ותרומות
              </Link>
              <Link to="/about" className="btn secondary">
                איך זה עובד?
              </Link>
            </div> */}
          </div>
        </div>
      </section>

      <section className="about-preview">
        <h2>קצת על הקהילה</h2>
        <p>
          “חבר ללוחם” היא קהילה שמחברת בין אזרחים לבין חיילים ואנשי מילואים. כאן
          אפשר לפרסם בקשה לעזרה, להציע תרומה מכל סוג, ולהיות חלק משרשרת של ערבות
          הדדית ונתינה אמיתית.
        </p>
        <Link to="/about" className="btn learn-more">
          קראו עוד
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
