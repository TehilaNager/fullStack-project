import { Link } from "react-router";
import "./homePage.css";
import backgroundImg from "../../images/soliders2.png";

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
            <p className="subtitle">
              פלטפורמה המחברת בין אזרחים תורמים לחיילים ואנשי מילואים.
              <br /> כאן אפשר לפרסם בקשה לעזרה, להציע תרומה מכל סוג, ולהיות חלק
              משרשרת של ערבות הדדית ונתינה אמיתית.
            </p>
            <div className="btn-section">
              <Link to="/about" className="btn btn-warning">
                איך זה עובד?
              </Link>
              <Link to="/about" className="btn btn-warning">
                איך זה עובד?
              </Link>
              {/* <Link to="/requests-donations" className="btn btn-warning">
                צפו בבקשות ותרומות
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* <section className="about-preview">
        <h2>קצת על הקהילה</h2>
        <p>
          “חבר ללוחם” היא קהילה שמחברת בין אזרחים לבין חיילים ואנשי מילואים. כאן
          אפשר לפרסם בקשה לעזרה, להציע תרומה מכל סוג, ולהיות חלק משרשרת של ערבות
          הדדית ונתינה אמיתית.
        </p>
        <Link to="/about" className="btn learn-more">
          קראו עוד
        </Link>
      </section> */}
    </div>
  );
}

export default HomePage;
