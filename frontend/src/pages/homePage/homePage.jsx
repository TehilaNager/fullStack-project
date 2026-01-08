import { Link } from "react-router";
import "./hero-section.css";
import "./latestItems-section.css";
import "./workflow-section.css";
import "./help-section.css";
import "./about-section.css";
import "./trust-section.css";
import InspiringMessages from "../../components/InspiringMessages/InspiringMessages";
import { useRequest } from "../../context/RequestContext";
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

      <section className="about-section">
        <div className="about-icon">
          <i className="bi bi-people"></i>
        </div>

        <h2 className="about-title">מי אנחנו?</h2>

        <p className="about-text">
          קהילה שמחברת בין חיילים ומילואים שצריכים תמיכה לבין מי שרוצה להושיט
          יד. כאן כל אחד יכול לתת תמיכה, לעזור ולהרגיש מחובר – להיות חלק ממעגל
          של חיזוק ותמיכה הדדית.
        </p>

        <p className="about-subtext">
          לחצו כאן כדי להכיר את הקהילה לעומק, להבין איך אנחנו פועלים באתר, ללמוד
          על המסלולים השונים להשתתפות ולראות איך גם אתם יכולים להצטרף ולהיות חלק
          מהחיזוק והתמיכה.
        </p>

        <Link className="about-btn" to="/about">
          למידע נוסף על הקהילה <i className="bi bi-arrow-left-short"></i>
        </Link>
      </section>

      <section className="trust-section">
        <h2 className="trust-title">כאן אפשר להרגיש בטוחים</h2>
        <p className="trust-subtitle">
          בקהילת חבר ללוחם כל אחד ואחת בידיים טובות
        </p>

        <div className="trust-cards">
          <div className="trust-card">
            <div className="trust-card-header">
              <i className="trust-icon bi bi-shield"></i>
              <h3 className="trust-heading">שקיפות מלאה</h3>
            </div>
            <p className="trust-text">
              כל תרומה וכל בקשה מטופלות באופן שקוף וברור, כך שתמיד תוכלו להיות
              בטוחים שהתרומה שלכם מגיעה למקום הנכון.
            </p>
          </div>

          <div className="trust-card">
            <div className="trust-card-header">
              <i className="trust-icon bi bi-lock"></i>
              <h3 className="trust-heading">אבטחת מידע</h3>
            </div>
            <p className="trust-text">
              המידע שלכם נשמר ומוגן ברמה הגבוהה ביותר, כדי שתוכלו להיות רגועים
              ובטוחים שהנתונים האישיים שלכם מוגנים.
            </p>
          </div>

          <div className="trust-card">
            <div className="trust-card-header">
              <i className="trust-icon bi bi-people"></i>
              <h3 className="trust-heading">מקצועיות ואכפתיות</h3>
            </div>
            <p className="trust-text">
              כל בקשה מטופלת על ידי צוות מקצועי ואכפתי, שמבין את הצרכים ופועל
              בקפדנות.
            </p>
          </div>

          <div className="trust-card">
            <div className="trust-card-header">
              <i className="trust-icon bi bi-hand-thumbs-up"></i>
              <h3 className="trust-heading">אמינות ומחויבות</h3>
            </div>
            <p className="trust-text">
              הקהילה מחויבת לפעול באמינות ובמסירות, ומקפידה שכל פעולה תתבצע
              בצורה אחראית.
            </p>
          </div>
        </div>
      </section>

      {/* אזור למה כדאי לתרום?*/}
      <InspiringMessages />
    </div>
  );
}

export default HomePage;
