import { Link } from "react-router";
import "./hero-section.css";
import "./latestItems-section.css";
import "./workflow-section.css";
import "./help-section.css";
import "./about-section.css";
import InspiringMessages from "../../components/InspiringMessages/InspiringMessages";
import { useRequest } from "../../context/requestContext";
import { useOffer } from "../../context/OfferContext";
import getLatestItems from "../../helpers/getLatestItems";
import Carousel from "../../components/Carousel/Carousel";
import helpCards from "../../helpers/helpData";
import HelpCard from "../../components/HelpCard/HelpCard";
import WorkflowCard from "../../components/WorkflowCard/WorkflowCard";
import workflowCards from "../../helpers/workflowData";

function HomePage() {
  const { requests } = useRequest();
  const { offers } = useOffer();
  const latestRequests = getLatestItems(requests);
  const latestOffers = getLatestItems(offers);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <i className="bi bi-heart-fill"></i> קהילה אזרחית תומכת
          </div>

          <h1 className="hero-title">חבר ללוחם</h1>

          <p className="hero-subtitle">
            פלטפורמה שמחברת בין חיילים ומילואימניקים הזקוקים לעזרה לבין אזרחים
            שרוצים לתת — <br />
            בצורה פשוטה, מכבדת ובטוחה
          </p>

          <div className="hero-actions">
            <Link to="/requests" className="hero-btn primary">
              צפו בבקשות
            </Link>
            <Link to="/offers" className="hero-btn secondary">
              צפו בתרומות
            </Link>
          </div>
        </div>
      </section>

      <Carousel
        className="section-light"
        title="בקשות אחרונות"
        subtitle="חיילים ומילואימניקים שזקוקים לעזרתכם"
        linkText="כל הבקשות"
        linkUrl="/requests"
        items={latestRequests}
      />

      <Carousel
        className="section-muted"
        title="תרומות אחרונות"
        subtitle="אזרחים שרוצים לתרום ולעזור"
        linkText="כל התרומות"
        linkUrl="/offers"
        items={latestOffers}
      />

      <section className="workflow-section">
        <h2 className="workflow-title">איך זה עובד?</h2>
        <p className="workflow-subtitle">
          שני מסלולים פשוטים לחיבור בין מי שצריך עזרה למי שרוצה לתת
        </p>

        <div className="workflow-grid">
          {workflowCards.map((card, index) => (
            <WorkflowCard
              key={index}
              type={card.type}
              icon={card.icon}
              title={card.title}
              steps={card.steps}
            />
          ))}
        </div>
        <p className="workflow-bridge">
          עכשיו, כשברור איך זה עובד — נפרוס חלק מדרכי העזרה האפשריות.
        </p>
      </section>

      <section className="help-section">
        <h2 className="help-section-title">איך אפשר לעזור?</h2>

        <p className="help-intro">
          הפלטפורמה מאפשרת מגוון רחב של דרכי סיוע לחיילים ולאנשי מילואים, בהתאם
          לצרכים שעולים מהשטח.
          <br />
          הרשימה שלהלן מציגה דוגמאות נפוצות לסוגי עזרה, אך אינה מוגבלת — כל
          תרומה, יוזמה או הצעה לעזרה מתקבלות בברכה.
          <br />
          <span className="help-intro-muted">
            ניתן לעיין בבקשות קיימות או לפרסם תרומה חדשה — גם אם אינה מופיעה
            ברשימה.
          </span>
        </p>

        <div className="help-options">
          {helpCards.map((card, index) => (
            <HelpCard
              key={index}
              title={card.title}
              items={card.items}
              text={card.text}
            />
          ))}
        </div>
      </section>

      {/* אזור מי אנחנו */}
      {/* <section className="about-section">
        <div className="about-icon">
          <i className="bi bi-heart"></i>
        </div>

        <h2 className="about-title">מי אנחנו?</h2>

        <p className="about-text">
          אנחנו קהילה שמטרתה לתמוך בחיילים ובמילואים, ליצור חיבור בין אזרחים
          לבין לוחמיהם ולוודא שכל תרומה מגיעה למקום הנכון.
        </p>

        <Link className="about-btn" to="/aboutPage">
          עוד קצת עלינו <i className="bi bi-arrow-left-short"></i>
        </Link>
      </section> */}

      <section className="about-section">
        <div className="about-icon">
          <i className="bi bi-heart"></i>
        </div>

        <h2 className="about-title">מי אנחנו?</h2>

        <p className="about-text">
          אנחנו קהילה שמטרתה לתמוך בחיילים ובמילואים, ליצור חיבור בין אזרחים
          לבין לוחמיהם ולוודא שכל תרומה מגיעה למקום הנכון.
        </p>

        <p className="about-subtext">
          כאן תוכלו גם לקבל הצצה איך המערכת שלנו עובדת, מה המסלולים השונים ואיך
          תוכלו להצטרף ולתרום בדרכים שונות.
        </p>

        <Link className="about-btn" to="/aboutPage">
          עוד קצת עלינו <i className="bi bi-arrow-left-short"></i>
        </Link>
      </section>

      {/* אזור אמון וביטחון באתר */}
      <section className="trust-section">
        <h2 className="trust-title">אמון וביטחון באתר</h2>
        <p className="trust-subtitle">אנחנו דואגים לכם ולנתונים שלכם בכל רגע</p>

        <div className="trust-cards">
          <div className="trust-card">
            <i className="bi bi-shield"></i>
            <h3>שקיפות מלאה</h3>
            <p>כל התרומות מנוהלות בצורה שקופה וניתן לעקוב אחריהן בזמן אמת</p>
          </div>

          <div className="trust-card">
            <i className="bi bi-lock"></i>
            <h3>אבטחת מידע</h3>
            <p>המידע שלכם מאובטח ומוגן ברמה הגבוהה ביותר</p>
          </div>

          <div className="trust-card">
            <i className="bi bi-check2-circle"></i>
            <h3>טיפול מקצועי</h3>
            <p>אנחנו מבטיחים שכל בקשה תטופל במקצועיות וביעילות</p>
          </div>
        </div>
      </section>

      {/* אזור למה כדאי לתרום?*/}
      <InspiringMessages />
    </div>
  );
}

export default HomePage;
