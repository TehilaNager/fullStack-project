import { Link } from "react-router";
import "./hero-section.css";
import "./latest-items-section.css";
import "./workflow-section.css";
import "./help-section.css";
import "./about-section.css";
import "./trust-section.css";
import "./inspiring-section.css";
import InspiringMessages from "../../components/InspiringMessages/InspiringMessages";
import { useRequest } from "../../context/RequestContext";
import { useOffer } from "../../context/OfferContext";
import getRecentItems from "../../helpers/getRecentItems";
import helpCards from "../../helpers/helpData";
import HelpCard from "../../components/HelpCard/HelpCard";
import workflowCards from "../../helpers/workflowData";
import WorkflowCard from "../../components/WorkflowCard/WorkflowCard";
import trustCards from "../../helpers/trustData";
import TrustCard from "../../components/TrustCard/TrustCard";
import RecentOffers from "../../components/RecentItems/RecentOffers";
import RecentRequests from "../../components/RecentItems/RecentRequests";

function HomePage() {
  const { requests } = useRequest();
  const { offers } = useOffer();
  const latestRequests = getRecentItems(requests);
  const latestOffers = getRecentItems(offers);

  return (
    <div>
      <section className="hero-section">
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

      <section className="latest-items-section">
        <RecentRequests
          title="בקשות אחרונות"
          subtitle="חיילים ומילואימניקים שזקוקים לעזרתכם"
          linkText="כל הבקשות"
          linkUrl="/requests"
          requests={latestRequests.slice(0, 6)}
        />
      </section>

      <section className="latest-items-section">
        <RecentOffers
          title="תרומות אחרונות"
          subtitle="אזרחים שרוצים לתרום ולעזור"
          linkText="כל התרומות"
          linkUrl="/offers"
          offers={latestOffers.slice(0, 6)}
        />
      </section>

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
          {trustCards.map((card, index) => (
            <TrustCard
              key={index}
              iconClass={card.iconClass}
              title={card.title}
              text={card.text}
            />
          ))}
        </div>
      </section>

      <section className="inspiring-section">
        <InspiringMessages />
      </section>
    </div>
  );
}

export default HomePage;
